import { Injectable } from '@nestjs/common';
import { PdfDocumentParser } from '../parsers/pdf-document.parser';
import { ParsedDocument } from '../interfaces/parsed-document.interface';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
  private readonly documentsPath = path.join(process.cwd(), 'data', 'pdfs');

  constructor(private readonly parser: PdfDocumentParser) {}

  async getDocuments(): Promise<ParsedDocument[]> {
    const files = await this.getFiles();
    const documents: ParsedDocument[] = [];

    for (const file of files) {
      documents.push(await this.parser.parse(file));
    }

    return documents;
  }

  // TODO: temporary solution, we should not store the files in the server, but rather in a cloud storage like S3 or GCP
  private async getFiles(): Promise<string[]> {
    const files = await fs.readdir(this.documentsPath);

    return files
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => path.join(this.documentsPath, file));
  }
}
