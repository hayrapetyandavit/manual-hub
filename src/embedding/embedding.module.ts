import { Module } from '@nestjs/common';
// import { OllamaEmbeddingProvider } from './providers/ollama-embedding.provider';
import { EmbeddingService } from './services/embedding.service';
// import { EMBEDDING_PROVIDER } from './interfaces/embedding-provider.interface';

@Module({
  providers: [
    // {
    //   provide: EMBEDDING_PROVIDER,
    //   useClass: OllamaEmbeddingProvider,
    // },
    EmbeddingService,
  ],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}
