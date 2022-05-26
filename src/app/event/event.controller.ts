import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventCreateDto, EventEditDto } from './event.dto';
import { EventService } from './event.service';

@Controller('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEvent(@Body() event: EventCreateDto) {
    return await this.eventService.create(event);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllEvents() {
    return await this.eventService.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getEvent(@Param('id') eventId: string) {
    return await this.eventService.read(eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateEvent(@Param('id') eventId: string, @Body() event: EventEditDto) {
    return await this.eventService.update(eventId, event);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteEvent(@Param('id') eventId: string) {
    return await this.eventService.delete(eventId);
  }
}
