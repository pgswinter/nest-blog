import { ResponseObject } from './../models/response.model';
import { CreateCommentDTO } from './../models/comment.models';
import { CommentsService } from './comments.service';
import {
  ArticleResponse,
  FindAllQuery,
  FindFeedQuery,
} from './../models/article.models';
import { OptionalAuthGuard } from './../auth/optional-auth-guard';
import { CreateArticleDTO, UpdateArticleDTO } from '../models/article.models';
import { UserEntity } from './../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import {
  Body,
  Controller,
  Param,
  UseGuards,
  ValidationPipe,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from '../auth/user.decorator';
import { Query } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(
    @User() user: UserEntity,
    @Query() query: FindAllQuery,
  ): Promise<
    ResponseObject<'articles', ArticleResponse[]> &
      ResponseObject<'articlesCount', number>
  > {
    const articles = await this.articleService.findAll(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/feed')
  @UseGuards(new OptionalAuthGuard())
  async findFeed(
    @User() user: UserEntity,
    @Query() query: FindFeedQuery,
  ): Promise<
    ResponseObject<'articles', ArticleResponse[]> &
      ResponseObject<'articlesCount', number>
  > {
    const articles = await this.articleService.findFeed(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = await this.articleService.findBySlug(slug);
    return { article: article.toArticle(user) };
  }

  @Post()
  @UseGuards(AuthGuard())
  async createArticle(
    @User() user: UserEntity,
    @Body('article', ValidationPipe) data: CreateArticleDTO,
  ) {
    const article = await this.articleService.createArticle(user, data);
    return { article };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
    @Body('article', ValidationPipe) data: UpdateArticleDTO,
  ) {
    const article = await this.articleService.updateArticle(slug, user, data);
    return { article };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param() slug: string, @User() user: UserEntity) {
    const article = await this.articleService.deleteArticle(slug, user);
    return { article };
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(@User() user: UserEntity, @Param('slug') slug: string) {
    const article = await this.articleService.favoriteArticle(slug, user);
    return { article };
  }

  @Delete('/:slug/unfavorite')
  @UseGuards(AuthGuard())
  async unfavoriteArticle(
    @User() user: UserEntity,
    @Param('slug') slug: string,
  ) {
    const article = await this.articleService.unfavoriteArticle(slug, user);
    return { article };
  }
}
