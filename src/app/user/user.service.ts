import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
    ) {}

    async read(userId: string) {
      return await this.userRepository.findOne(userId);
    }

    async list() {
      const [users, count] = await this.userRepository.findAndCount({
        where: {
          deletedAt: null
        }
      });
      return { count, users };
    }
    
    async delete(userId: string) {
      return await this.userRepository.update(userId, { deletedAt: new Date() });
    }

    async save(user: UserEntity) {
      const password = hashSync(user.password, 10);
      return await this.userRepository.save({ ...user, password });
    }
}
