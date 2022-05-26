import { Controller, Get, Request, Param, UseGuards, Delete, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async readUser(@Param('id') userId: string) {
    return await this.userService.read(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.userService.list()
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async save(@Body() userDto: UserDto) {
    const entity = new UserEntity();
    const { email, firstName, id, lastName, password } = userDto;
    entity.firstName = firstName;
    entity.lastName = lastName;
    entity.password = password;
    entity.email = email;

    if (id) {
      entity.id = id;
    }

    return await this.userService.save(entity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') userId: string) {
    return await this.userService.delete(userId);
  }
}
