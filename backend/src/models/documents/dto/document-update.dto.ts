import { PartialType } from '@nestjs/mapped-types';
import { DocCreateDto } from './document-create.dto';

export class DocUpdateDto extends PartialType(DocCreateDto) {}
