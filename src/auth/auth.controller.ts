import { ResponseObject } from './../models/response.model';
import { AuthResponse, LoginDTO, RegisterDTO } from '../models/user.models';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body(ValidationPipe) credentials: RegisterDTO) {
    const user = await this.authService.register(credentials);
    return { user };
  }

  @Post('/login')
  async login(@Body('user', ValidationPipe) credentials: LoginDTO): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.login(credentials);
    return { user };
  }
}
