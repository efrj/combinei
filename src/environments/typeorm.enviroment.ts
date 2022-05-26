import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeorm: TypeOrmModuleOptions = {
  type: 'mysql',
  port: (process.env.TYPEORM_PORT || 3306) as number,
  host: process.env.TYPEORM_HOST || 'localhost',
  username: process.env.TYPEORM_USERNAME || 'root',
  password: process.env.TYPEORM_PASSWORD || 'pewq2#@CombineiMySQL.db',
  database: process.env.TYPEORM_DATABASE || 'cb_combineidb',
  logging: ['query', 'error', 'info'],
  synchronize: true,
};
