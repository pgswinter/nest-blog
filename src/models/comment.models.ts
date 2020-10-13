import { ProfileResponse } from './user.models';
import { UserEntity } from './../entities/user.entity';
import { IsString } from 'class-validator';
export class CreateCommentDTO {
    @IsString()
    body: string
}

export interface CommentResponse {
    id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    body: string;
    author: ProfileResponse | UserEntity;
  }