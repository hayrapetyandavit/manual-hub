import { Injectable } from '@nestjs/common';
import { VectorStore, VectorPoint } from './interfaces/vector-store.interface';
import { QdrantService } from '../qdrant/qdrant.service';
import {
  QDRANT_COLLECTION,
  VECTORE_STORE_SEARCH_LIMIT,
} from 'src/common/constants';

@Injectable()
export class VectorStoreService implements VectorStore {
  constructor(private readonly qdrant: QdrantService) {}

  async save(points: VectorPoint[]) {
    await this.qdrant.getClient().upsert(QDRANT_COLLECTION, { points });
  }

  async search(
    vector: number[],
    limit = VECTORE_STORE_SEARCH_LIMIT,
  ): Promise<any[]> {
    return this.qdrant.search(vector, limit);
  }
}
