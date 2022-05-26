import { Injectable, UnauthorizedException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync, compareSync } from 'bcryptjs';
import * as crypto from 'crypto';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/user.dto';
import { CredentialsDto, ChangePasswordDto } from './auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { use } from 'passport';
import { FRONT_HOST } from '@combinei/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;
    if (compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async new(userDto: UserDto) : Promise<UserDto> {
    const password = hashSync(userDto.password, 10);
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const user = await this.userRepository.save({ ...userDto, password, confirmationToken });
    const mail = {
      to: userDto.email,
      from: 'Combinei.app <nao_responda@combinei.app>',
      subject: 'Email de confirmação',
      template: 'email-confirmation',
      context: {
        token: confirmationToken,
        host: FRONT_HOST
      },
    };
    await this.mailerService.sendMail(mail);
    return userDto;
  }

  async login(credentialsDto: CredentialsDto) {
    const user = await this.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = { id: user.id };
    const token = this.jwtService.sign(jwtPayload);
    return { ...user, token: token };
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOneOrFail({ email });
    const pwd = hashSync(credentialsDto.password, 10);

    if (user && pwd === user.password) return user;
    return null;
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.userRepository.update(
      { confirmationToken },
      { confirmationToken: null },
    );
    if (result.affected === 0) throw new NotFoundException('Token inválido');
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    const recoverToken = crypto.randomBytes(32).toString('hex');
    await this.userRepository.save({ ...user, recoverToken });

    const mail = {
      to: user.email,
      from: 'Combinei.app <nao_responda@combinei.app>',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: recoverToken,
        host: FRONT_HOST
      },
    };
    await this.mailerService.sendMail(mail);
  }

  async udpatePassword(id: string, password: string) {
    const user = await this.userRepository.findOne(id);
    user.password = hashSync(password, 10);
    await user.save();
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password != passwordConfirmation)
      throw new UnprocessableEntityException('As senhas não conferem');

    await this.udpatePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(
      { recoverToken },
      {
        select: ['id'],
      },
    );
    if (!user) throw new NotFoundException('Token inválido.');

    try {
      await this.changePassword(user.id.toString(), changePasswordDto);
    } catch (error) {
      throw error;
    }
  }

}
