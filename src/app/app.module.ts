import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { environment } from '../environments/environment.prod';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { EventModule } from './event/event.module';
import { JobModule } from './job/job.module';

import { UserEntity } from './user/user.entity';
import { ScheduleEntity } from './schedule/schedule.entity';
import { EventEntity } from './event/event.entity';
import { JobEntity } from './job/job.entity';

const entities = [UserEntity, ScheduleEntity, EventEntity, JobEntity];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...environment.typeorm, entities }),
    MailerModule.forRoot(environment.mailerConfig),
    MockModule,
    AuthModule,
    UserModule,
    ScheduleModule,
    EventModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
