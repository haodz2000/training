import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { hassPassword } from '../auth/bcrypt';
import { MailService } from '../mail/mail.service';
import { UserEmailDto } from './dto/user-email.dto';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRespostory: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async sendConfirm(emailDto: UserEmailDto): Promise<{ message: string }> {
    const user = await this.userRespostory.findOne({ email: emailDto.email });
    if (user) {
      const { id, email, type } = user;
      const payload = { id, email, type };
      const tokenReset = this.jwtService.sign(payload);
      await this.userRespostory.update(user, {
        ...user,
        tokenResetPassword: tokenReset,
      });
      const res = await this.mailService.sendUserConfirmation(
        email,
        tokenReset,
      );
      return res;
    } else {
      throw new HttpException('Not exits email', HttpStatus.NOT_FOUND);
    }
  }

  async confirm(token: string): Promise<string> {
    try {
      const newPassword = Math.random().toString(36).slice(-8);
      const payload = this.jwtService.verify(token);
      if (payload) {
        const hassPass = hassPassword(newPassword);
        const user = await this.userRespostory.findOne({
          where: { tokenResetPassword: token },
        });
        if (user) {
          if (user.email === payload.email) {
            await this.userRespostory.update(user, {
              ...user,
              password: hassPass,
              tokenResetPassword: null,
            });
            return await this.mailService.sendPasswordReset(
              newPassword,
              user.email,
            );
          }
        } else {
          throw new HttpException('Token not valid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
