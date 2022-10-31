import { IsDefined, IsEmail, MinLength } from 'class-validator';
import { IsLength } from './length.dto';
import { IsNumberString } from './string-number.dto';

export class CreateUserDto {
  @IsDefined()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @IsLength({ message: 'Identify card must equal 9 or 12 number' })
  @IsNumberString({ message: 'Identify card must is number' })
  identifyCard: string;

  @IsDefined()
  @MinLength(8)
  password: string;

  @IsDefined()
  birthday: Date;

  @IsDefined()
  gender: number;

  @IsDefined()
  wardId: number;
}
