import { PartialType } from '@nestjs/mapped-types';
import { VaccineCreateDto } from './vaccine-create.dto';

export class VaccineUpdateDto extends PartialType(VaccineCreateDto) {}
