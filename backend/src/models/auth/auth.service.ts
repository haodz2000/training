import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { ILoginResponse } from './interfaces/login_response.interface';
import { IPayloadToken } from './interfaces/payload_token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<IUser> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatched: boolean = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const { password, tokenResetPassword, ...others } = user;
        const data = { password, tokenResetPassword, response: others };
        return data.response;
      } else {
        return null;
      }
    }
  }

  async login(user: Partial<IUser>): Promise<ILoginResponse> {
    const payload = { email: user.email, id: user.id, type: user.type };
    return { token: this.jwtService.sign(payload) };
  }

  async register(user: CreateUserDto): Promise<Partial<IUser> | undefined> {
    try {
      const identifyCard = user.identifyCard;
      const email = user.email;
      const exitsEmail = await this.userRepository.findOne({ email });
      const exitsIdentifyCard = await this.userRepository.findOne({
        identifyCard,
      });
      if (!exitsEmail && !exitsIdentifyCard) {
        const pwd = user.password;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(pwd, salt);
        const saveUser = {
          ...user,
          password: hashPassword,
        };
        const newUser = await this.userRepository.save(saveUser);
        const { password, type, tokenResetPassword, ...others } = newUser;
        const data = { password, type, tokenResetPassword, response: others };
        const result = data.response;
        return result;
      } else {
        if (!!exitsEmail) {
          throw new HttpException(
            'Email da duoc dang ky',
            HttpStatus.NOT_ACCEPTABLE,
          );
        } else {
          throw new HttpException(
            'So CMND da duoc dang ky',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout() {
    return {
      status: 200,
      msg: 'Logout success',
    };
  }
  // { user: IResponse; isAdmin: boolean }
  async findUserLogin(
    token: string,
  ): Promise<{ user: Partial<IUser>; isAdmin: boolean }> {
    try {
      if (token) {
        const payload: IPayloadToken = await this.jwtService.verify(token);
        if (payload) {
          const user = await this.usersService.findOne(payload.id);
          if (user) {
            return { user: user, isAdmin: payload.type === 1 };
          }
        }
      } else {
        throw new HttpException('Token in valid', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
