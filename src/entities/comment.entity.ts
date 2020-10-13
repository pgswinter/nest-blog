import { ArticleEntity } from './article.entity';
import { classToPlain } from 'class-transformer';
import { UserEntity } from './user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  body: string;

  @ManyToOne(
    type => UserEntity,
    user => user.comments,
    { eager: true },
  )
  author: UserEntity;

  @ManyToOne(
      type => ArticleEntity,
      article => article.comments
  )
  article: ArticleEntity;

  toJSON() {
      return classToPlain(this)
  }
  
}
