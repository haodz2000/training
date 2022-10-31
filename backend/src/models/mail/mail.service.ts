import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { mailConstants } from './constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `${mailConstants.urlForgotPasswrod}${token}`;
    await this.mailerService.sendMail({
      to: email,
      from: mailConstants.user,
      subject: 'Confirm reset password',
      html: `
      <p>Link reset-password co gia tri trong vong 1 phut</p>
      <a href=${url}>Confirm</a>
      `,
    });
    return {
      message:
        'Check email verify confirm reset password. Link expires within 60s',
    };
  }

  async sendPasswordReset(password: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: mailConstants.user,
      subject: 'Reset password',
      html: `
      <p>Mat khau moi cua ban la:<strong>${password}</strong></p>`,
    });
    return 'Xem mat khau moi trong email cua ban';
  }
}
