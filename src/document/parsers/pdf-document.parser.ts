import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PDFParse } from 'pdf-parse';

import { DocumentParser } from '../interfaces/document-parser.interface';
import { ParsedDocument } from '../interfaces/parsed-document.interface';

@Injectable()
export class PdfDocumentParser implements DocumentParser {
  async parse(filePath: string): Promise<ParsedDocument> {
    try {
      const buffer = await fs.readFile(filePath);
      const parser = new PDFParse({ data: buffer });

      const result = await parser.getText();

      await parser.destroy();

      return {
        id: crypto.randomUUID(),
        name: path.basename(filePath),
        text: result.text,
        metadata: {
          source: filePath,
          pageCount: result.total,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to parse PDF: ${filePath}`,
      );
    }
  }
}
