import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { EventEntity } from './event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, ScheduleEntity])],
  controllers: [EventController],
  providers: [EventService],
  exports: [TypeOrmModule],
})
export class EventModule {}
