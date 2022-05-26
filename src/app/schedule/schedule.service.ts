import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async list() {
    const [schedules, count] = await this.scheduleRepository.findAndCount({
      relations: ['events'],
    });
    return { count, schedules };
  }

  async create(data) {
    return await this.scheduleRepository.insert(data);
  }

  async read(scheduleId: string) {
    return await this.scheduleRepository.findOne(scheduleId, { relations: ['events'] });
  }

  async update(scheduleId: string, data) {
    return await this.scheduleRepository.update(scheduleId, data);
  }

  async delete(scheduleId: string) {
    return await this.scheduleRepository.update(scheduleId, { deletedAt: new Date() });
  }
}
