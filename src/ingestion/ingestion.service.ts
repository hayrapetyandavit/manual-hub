import { Inject, Injectable, Logger } from '@nestjs/common';
import { TextChunkerService } from 'src/chunking/services/text-chunker.service';
import { DocumentService } from 'src/document/services/document.service';
import { EmbeddingService } from 'src/embedding/services/embedding.service';
import {
  VectorStore,
  VECTOR_STORE_PROVIDER,
} from 'src/qdrant/interfaces/vector-store.interface';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly documentService: DocumentService,
    private readonly chunker: TextChunkerService,
    private readonly embeddingService: EmbeddingService,
    @Inject(VECTOR_STORE_PROVIDER) private readonly vectorStore: VectorStore,
  ) {}

  async ingest(): Promise<void> {
    this.logger.log('Starting ingestion');

    const documents = await this.documentService.getDocuments();

    for (const document of documents) {
      this.logger.log(`Processing ${document.name}`);

      const chunks = await this.chunker.chunk(document);

      this.logger.log(`Created ${chunks.length} chunks`);

      const embeddings = await this.embeddingService.embedMany(
        chunks.map((chunk) => chunk.text),
      );

      await this.vectorStore.save(chunks, embeddings);

      this.logger.log(`${document.name} completed`);
    }

    this.logger.log('Ingestion finished');
  }
}
