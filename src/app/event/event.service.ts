import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from './event.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { EventCreateDto, EventEditDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async list() {
    const [events, count] = await this.eventRepository.findAndCount({
      relations: ['schedule'],
    });
    return { count, events };
  }

  async create(event: EventCreateDto) {
    try {
      return await this.eventRepository.save({ ...event });
    } catch (error) {
      throw new Error(error);
    }
  }

  async read(eventId: string) {
    return await this.eventRepository.findOne(eventId, { relations: ['schedule'] });
  }

  async update(eventId: string, data: EventEditDto) {
    return await this.eventRepository.update(eventId, data);
  }

  async delete(eventId: string) {
    return await this.eventRepository.update(eventId, { deletedAt: new Date() });
  }
}
