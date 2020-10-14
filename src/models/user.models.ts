import { UserEntity } from './../entities/user.entity';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({type: String, description: 'email'})
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({type: String, description: 'password'})
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({type: String, description: 'username'})
  username: string;
}

export interface AuthPayload {
  username: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  image: string

  @IsOptional()
  bio: string
}

export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends Partial<UserEntity> {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}