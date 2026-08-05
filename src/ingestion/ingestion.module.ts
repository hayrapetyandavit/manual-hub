import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { DocumentModule } from 'src/document/document.module';
import { ChunkingModule } from 'src/chunking/chunking.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';

@Module({
  imports: [DocumentModule, ChunkingModule, EmbeddingModule, QdrantModule],
  controllers: [IngestionController],
  providers: [IngestionService],
  exports: [IngestionService],
})
export class IngestionModule {}
