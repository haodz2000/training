import { IsDefined, IsString } from 'class-validator';

export class DocCreateDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  hashName: string;

  @IsDefined()
  @IsString()
  link: string;

  description: string;
}
