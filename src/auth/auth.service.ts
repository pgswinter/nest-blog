import { UserEntity } from './../entities/user.entity';
import { LoginDTO, RegisterDTO } from './../../models/user.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
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
      user.save();
      return user;
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
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
