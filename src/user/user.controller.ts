import { UpdateUserDTO } from './../models/user.model';
import { UserEntity } from './../entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from '../auth/user.decoration';
import { AuthGuard } from '@nestjs/passport';
import { ValidationTypes } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { username }: UserEntity) {
    return this.userService.findByUsername(username);
  }

  @Put()
  @UseGuards(AuthGuard())
  update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({transform: true, whitelist: true}))
    data: UpdateUserDTO,
  ) {
    return this.userService.updateUser(username, data);
  }
}
