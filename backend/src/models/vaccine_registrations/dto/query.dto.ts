import { IsDefined, IsNumber, IsString } from 'class-validator';

export class QueryDto {
  @IsDefined()
  @IsString()
  token: string;

  @IsDefined()
  @IsNumber()
  status: number;
}
