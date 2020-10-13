import { CreateCommentDTO } from './../models/comment.models';
import { AuthGuard } from '@nestjs/passport';
import { FindAllQuery } from './../models/article.models';
import { UserEntity } from './../entities/user.entity';
import { OptionalAuthGuard } from './../auth/optional-auth-guard';
import { ArticleService } from './article.service';
import { CommentsService } from './comments.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../auth/user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Get('/:slug/comments')
  @UseGuards(new OptionalAuthGuard())
  async findComments(@Param('slug') slug: string) {
    const comments = await this.commentsService.findByArticleSlug(slug);
    return { comments };
  }

  @Get()
  @UseGuards(AuthGuard())
  async findCommentById(id: number) {
    const comments = await this.commentsService.findById(id);
    return { comments };
  }

  @UseGuards(AuthGuard())
  @Post('/:slug/comments')
  async createCommnet(
    @User() user: UserEntity,
    @Body(ValidationPipe) data: { comments: CreateCommentDTO },
  ) {
    const comment = await this.commentsService.createCommnet(
      user,
      data.comments,
    );
    return { comment };
  }

  @Delete('/:slug/comments/:id')
  @UseGuards(AuthGuard())
  async deleteComment(@User() user: UserEntity, @Param('id') id: number) {
    const comment = await this.commentsService.deleteComment(user, id);
    return { comment };
  }
}
