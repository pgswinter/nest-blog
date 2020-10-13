import { CreateCommentDTO } from './../models/comment.models';
import { UserEntity } from './../entities/user.entity';
import { CommentEntity } from './../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  findByArticleSlug(slug: string) {
    return this.commentRepo.find({
      where: { 'article.slug': slug },
      relations: ['article'],
    });
  }

  findById(id: number) {
    return this.commentRepo.findOne({ where: { id } });
  }

  async createCommnet(user: UserEntity, data: CreateCommentDTO) {
    const comment = await this.commentRepo.create(data);
    comment.author = user;
    comment.save();
    return this.commentRepo.findOne({ where: { body: data.body } });
  }

  async deleteComment(user: UserEntity, id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id, 'author.id': user.id },
    });
    comment.remove();
    return comment;
  }
}
