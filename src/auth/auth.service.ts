import { ResponseObject } from './../models/response.model';
import { AuthResponse, UpdateUserDTO } from '../models/user.models';
import { UserEntity } from './../entities/user.entity';
import { LoginDTO, RegisterDTO } from '../models/user.models';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  // private mockUser = {
  //   email: 'jake@jake.jake',
  //   token: 'jwt.token.here',
  //   username: 'jake',
  //   bio: 'I work at statefarm',
  //   image: null,
  // };

  async register(credentials: RegisterDTO) {
    // return this.mockUser;
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO) {
    // if (credentials.email === this.mockUser.email) {
    //   return this.mockUser;
    // }
    // throw new InternalServerErrorException();
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credential');
      }

      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      console.log(`token ---: `, token);

      return { ...user.toJSON(), token };
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findCurrentUser(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
    });
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { ...user.toJSON(), token };
  }

  async updateUser(
    username: string,
    data: UpdateUserDTO,
  ): Promise<AuthResponse> {
    await this.userRepo.update({ username }, data);
    const user = await this.userRepo.findOne({
      where: { username },
    });
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { ...user.toJSON(), token };
  }
}
