import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { ParsedDocument } from './interfaces/parsed-document.interface';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getDocuments(): Promise<ParsedDocument[]> {
    return this.documentService.getDocuments();
  }
}
