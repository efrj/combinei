import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { UserEntity } from '../user/user.entity';
import { UserInterface } from '@combinei/interfaces';

@Injectable()
export class MockService {
  constructor(private readonly connection: Connection) {}

  async mockUsers() {
    const repo = await this.connection.getRepository(UserEntity);

    const users: UserInterface[] = [
      {
        email: 'appcombinei@gmail.com',
        password: hashSync('appcombinei@gmail.com'),
        firstName: 'Combinei',
        lastName: 'App'
      },
      {
        email: 'nandomoreira.me@gmail.com',
        password: hashSync('nandomoreira.me@gmail.com'),
        firstName: 'Nando',
        lastName: 'Moreira'
      },
      {
        email: 'matheus.costa.vieira@gmail.com',
        password: hashSync('matheus.costa.vieira@gmail.com'),
        firstName: 'Matheus',
        lastName: 'Costa Vieira'
      },
      {
        email: 'webefrj@gmail.com',
        password: hashSync('webefrj@gmail.com'),
        firstName: 'Edivaldo',
        lastName: 'Reis'
      },
      {
        email: 'math.d@live.com',
        password: hashSync('math.d@live.com'),
        firstName: 'Matheus',
        lastName: 'Donizete'
      },
    ];

    await this.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    await repo.clear();
    await this.connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    return repo.save([...users]);
  }
}
