import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/typeorm/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
