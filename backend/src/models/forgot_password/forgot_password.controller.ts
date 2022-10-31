import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEmailDto } from './dto/user-email.dto';
import { ForgotPasswordService } from './forgot_password.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async sendConfirm(@Body() emailDto: UserEmailDto) {
    return await this.forgotPasswordService.sendConfirm(emailDto);
  }

  @Get('/:token')
  async confirm(@Param('token') token: string) {
    return await this.forgotPasswordService.confirm(token);
  }
}
