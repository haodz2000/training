import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateRegistrationDto } from './create_registration.dto';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  @IsNumber()
  vaccineId: number;

  @IsNumber()
  siteId: number;

  @IsNumber()
  status: number;
}
