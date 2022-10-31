import { IsDefined, IsEmail } from 'class-validator';

export class UserEmailDto {
  @IsEmail()
  @IsDefined()
  email: string;
}
