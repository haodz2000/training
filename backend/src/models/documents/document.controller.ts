import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/role.enum';
import { DocumentService } from './document.service';
import { DocCreateDto } from './dto/document-create.dto';
import { DocUpdateDto } from './dto/document-update.dto';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  async findAll() {
    return await this.documentService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.documentService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/')
  async create(@Body() docCreateDto: DocCreateDto) {
    return await this.documentService.create(docCreateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() docUpdateDto: DocUpdateDto,
  ) {
    return await this.documentService.update(id, docUpdateDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.documentService.delete(id);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/documents',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Post('/upload')
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            '^[^<>.]+(.doc|.DOC|.docx|.DOCX|.pdf|.PDF|vnd.openxmlformats-officedocument.wordprocessingml.document)$',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return await this.documentService.upload(file);
  }

  @Get('download/:filename')
  download(@Param('filename') filename, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/documents/' + filename));
  }
}
