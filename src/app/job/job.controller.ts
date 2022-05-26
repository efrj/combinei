import { Controller, Post, Get, Param, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobService } from './job.service';
import { JobDto } from './job.dto';

@Controller('Job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listJobs() {
    return await this.jobService.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createJob(@Body() job: JobDto) {
    return await this.jobService.create(job);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async readJob(@Param('id') jobId: string) {
    return await this.jobService.read(jobId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateJob(@Param('id') jobId: string, @Body() job: JobDto) {
    return await this.jobService.update(jobId, job);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteService(@Param('id') serviceId: string) {
    return await this.jobService.delete(serviceId);
  }
}
