import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/typeorm/entities/document.entity';
import { Repository } from 'typeorm';
import { DocCreateDto } from './dto/document-create.dto';
import { DocUpdateDto } from './dto/document-update.dto';
import * as dotenv from 'dotenv';
import { IDocument } from './interfaces/document.interface';
dotenv.config();
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async findAll(): Promise<IDocument[]> {
    try {
      const documents = await this.documentRepository.find();
      if (documents) {
        return documents;
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<IDocument> {
    try {
      const document = await this.documentRepository.findOne({ id });
      if (document) {
        return document;
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(docCreateDto: DocCreateDto): Promise<IDocument> {
    try {
      return await this.documentRepository.save(docCreateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, docUpdateDto: DocUpdateDto): Promise<IDocument> {
    try {
      await this.documentRepository.update({ id }, docUpdateDto);
      return this.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.documentRepository.delete({ id });
      return { message: 'success' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async upload(
    file: Express.Multer.File,
  ): Promise<{ link: string; hashName: string }> {
    const filename = file.filename;
    const hashName = file.fieldname;
    const link = process.env.BASE_URL + 'documents/download/' + filename;
    return { link, hashName };
  }
}
