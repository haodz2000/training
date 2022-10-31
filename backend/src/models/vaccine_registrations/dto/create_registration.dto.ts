import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsDefined()
  @IsNumber()
  userId: number;

  @IsDefined()
  @IsNumber()
  groupId: number;

  @IsDefined()
  @IsString()
  insurranceCard: string;

  @IsDefined()
  @IsString()
  job: string;

  @IsDefined()
  @IsString()
  workPlace: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  time: Date;

  @IsDefined()
  @IsNumber()
  shift: number;
}
