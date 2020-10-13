import { AuthService } from './../auth/auth.service';
import { UpdateUserDTO } from '../models/user.models';
import { UserEntity } from './../entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ValidationTypes } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { username }: UserEntity) {
    return this.authService.findCurrentUser(username);
  }

  @Put()
  @UseGuards(AuthGuard())
  update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({transform: true, whitelist: true}))
    data: {user: UpdateUserDTO},
  ) {
    return this.authService.updateUser(username, data.user);
  }
}
