import { IsDefined, IsString } from 'class-validator';

export class GroupDto {
  @IsDefined()
  @IsString()
  name: string;
}
