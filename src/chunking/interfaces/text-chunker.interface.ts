import { ParsedDocument } from 'src/document/interfaces/parsed-document.interface';

export interface DocumentChunk {
  id: string;
  text: string;
  metadata: {
    documentId: string;
    documentName: string;
    chunkIndex: number;
  };
}

export interface TextChunker {
  chunk(document: ParsedDocument): Promise<DocumentChunk[]>;
}
