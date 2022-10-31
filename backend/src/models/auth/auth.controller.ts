import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUser } from './interfaces/user.interface';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  async findUserLogin(@Query() { token }: { token: string }) {
    return await this.authService.findUserLogin(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: Partial<IUser>) {
    return this.authService.login(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Get('/logout')
  async logout() {
    return await this.authService.logout();
  }
}
