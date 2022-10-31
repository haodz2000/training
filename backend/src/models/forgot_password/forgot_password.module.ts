import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPasswordService } from './forgot_password.service';
import { ForgotPasswordController } from './forgot_password.controller';
import { User } from 'src/typeorm/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
