import { IsDefined, IsString, Length } from 'class-validator';

export class VaccineCreateDto {
  @IsString()
  @IsDefined()
  @Length(3)
  name: string;

  @IsString()
  @IsDefined()
  @Length(6)
  code: string;
}
