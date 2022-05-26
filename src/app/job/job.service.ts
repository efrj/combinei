import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from './job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async list() {
    const [jobs, count] = await this.jobRepository.findAndCount();
    return { count, services: jobs };
  }

  async create(data) {
    return await this.jobRepository.insert(data);
  }

  async read(jobId: string) {
    return await this.jobRepository.findOne(jobId);
  }

  async update(jobId: string, data) {
    return await this.jobRepository.update(jobId, data);
  }

  async delete(jobId: string) {
    return await this.jobRepository.update(jobId, { deletedAt: new Date() });
  }
}
