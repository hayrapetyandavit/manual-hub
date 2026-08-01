import { Injectable } from '@nestjs/common';
import { EmbeddingService } from '../embedding/services/embedding.service';
import { VectorStoreService } from '../vector-store/vector-store.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly vectorStore: VectorStoreService,
  ) {}

  async search(query: string) {
    const vector = await this.embeddingService.embed(query);

    const results = await this.vectorStore.search(vector, 5);

    return results.map((item) => ({
      score: item.score,
      ...item.payload,
    }));
  }
}
