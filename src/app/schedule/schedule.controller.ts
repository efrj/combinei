import { Controller, Post, Get, Param, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScheduleService } from './schedule.service';
import { ScheduleDto } from './schedule.dto';

@Controller('Schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listSchedules() {
    return await this.scheduleService.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSchedule(@Body() schedule: ScheduleDto) {
    return await this.scheduleService.create(schedule);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async readSchedule(@Param('id') scheduleId: string) {
    return await this.scheduleService.read(scheduleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateSchedule(@Param('id') scheduleId: string, @Body() schedule: ScheduleDto) {
    return await this.scheduleService.update(scheduleId, schedule);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteSchedule(@Param('id') scheduleId: string) {
    return await this.scheduleService.delete(scheduleId);
  }
}
