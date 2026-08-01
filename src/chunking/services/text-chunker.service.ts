import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { DocumentChunk } from '../interfaces/text-chunker.interface';
import { ParsedDocument } from 'src/document/interfaces/parsed-document.interface';
import { CHUNK_OVERLAP, CHUNK_SIZE } from 'src/common/constants';

@Injectable()
export class TextChunkerService {
  private readonly splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  async chunk(document: ParsedDocument): Promise<DocumentChunk[]> {
    const chunks = await this.splitter.createDocuments([document.text]);

    return chunks.map((chunk, index) => ({
      id: crypto.randomUUID(),
      text: chunk.pageContent,
      metadata: {
        documentId: document.id,
        documentName: document.name,
        chunkIndex: index,
      },
    }));
  }
}
