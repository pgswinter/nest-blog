import { UserEntity } from './../entities/user.entity';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/user.decoration';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}
  @Get('/:username')
  async findProfile(@Param('username') username: string) {
    const profile = await this.userService.findByUsername(username);
    if (!profile) {
      throw new NotFoundException();
    }
    return { profile };
  }

  @Post('/:username/follow')
  @UseGuards(AuthGuard())
  async followUser(
    @User() user: UserEntity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.followUser(user, username);
    return { profile };
  }

  @Delete('/:username/follow')
  @UseGuards(AuthGuard())
  async unfollowUser(
    @User() user: UserEntity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.unfollowUser(user, username);
    return { profile };
  }
}
