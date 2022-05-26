import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleEntity } from './schedule.entity';
import { EventEntity } from '../event/event.entity';

import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, EventEntity])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [TypeOrmModule],
})
export class ScheduleModule {}
