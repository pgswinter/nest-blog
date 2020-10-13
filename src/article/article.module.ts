import { TagEntity } from './../entities/tag.entity';
import { UserEntity } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleEntity } from '../entities/article.entity';
import { AuthModule } from '../auth/auth.module';
import { CommentEntity } from './../entities/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      UserEntity,
      CommentEntity,
      TagEntity
    ]),
    AuthModule,
  ],
  providers: [
    ArticleService,
    CommentsService
  ],
  controllers: [
    ArticleController,
    CommentsController
  ],
})
export class ArticleModule {}
