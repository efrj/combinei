import { Controller, Body, Post, UseGuards, BadRequestException, ValidationPipe, Patch, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto, ChangePasswordDto } from './auth.dto';
import { UserDto } from '../user/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserDto) : Promise<UserDto> {
    try {
      return await this.authService.new(user);
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) credentiaslsDto: CredentialsDto) {
    return await this.authService.login(credentiaslsDto);
  }

  @Patch(':token')
  async confirmEmail(@Param('token') token: string) {
    return {
      message: 'Email confirmado',
    };
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @Patch(':id/change-password')
  @UseGuards(AuthGuard())
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: UserDto,
  ) {
    // if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
    //   throw new UnauthorizedException(
    //     'Você não tem permissão para realizar esta operação',
    //   );

    await this.authService.changePassword(id, changePasswordDto);
    return {
      message: 'Senha alterada',
    };
  }
}
