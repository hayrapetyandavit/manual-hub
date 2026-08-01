import { Inject, Injectable } from '@nestjs/common';
import {
  EMBEDDING_PROVIDER,
  EmbeddingProvider,
} from '../interfaces/embedding-provider.interface';

@Injectable()
export class EmbeddingService {
  constructor(
    @Inject(EMBEDDING_PROVIDER) private readonly provider: EmbeddingProvider,
  ) {}

  async embed(text: string): Promise<number[]> {
    return this.provider.embed(text);
  }

  async embedMany(texts: string[]): Promise<number[][]> {
    return this.provider.embedMany(texts);
  }
}
