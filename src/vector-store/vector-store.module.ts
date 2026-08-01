import { Module } from '@nestjs/common';
import { VectorStoreService } from './vector-store.service';
import { QdrantModule } from '../qdrant/qdrant.module';

@Module({
  imports: [QdrantModule],
  providers: [VectorStoreService],
  exports: [VectorStoreService],
})
export class VectorStoreModule {}
