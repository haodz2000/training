import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateSiteDto {
  @IsDefined()
  @IsNumber()
  wardId: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  leader: string;

  @IsDefined()
  @IsNumber()
  table: number;
}
