import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { PdfDocumentParser } from './parsers/pdf-document.parser';
import { DocumentController } from './document.controller';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PdfDocumentParser],
  exports: [DocumentService],
})
export class DocumentModule {}
