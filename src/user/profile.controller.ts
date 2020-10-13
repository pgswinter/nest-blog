import { OptionalAuthGuard } from './../auth/optional-auth-guard';
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
  HttpCode,
} from '@nestjs/common';
import { User } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}
  @Get('/:username')
  @UseGuards(new OptionalAuthGuard())
  async findProfile(
    @Param('username') username: string,
    @User() user: UserEntity,
  ) {
    const profile = await this.userService.findByUsername(username, user);
    if (!profile) {
      throw new NotFoundException();
    }
    return { profile };
  }

  @Post('/:username/follow')
  @HttpCode(200)
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
