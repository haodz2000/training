import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { mailConstants } from './constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: mailConstants.host,
        port: parseInt(mailConstants.port),
        secure: false,
        auth: {
          user: mailConstants.user,
          pass: mailConstants.pass,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
