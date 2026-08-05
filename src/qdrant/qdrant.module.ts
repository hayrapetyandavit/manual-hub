import { Module } from '@nestjs/common';
import { QdrantService } from './qdrant.service';
import { VECTOR_STORE_PROVIDER } from './interfaces/vector-store.interface';

@Module({
  providers: [
    {
      provide: VECTOR_STORE_PROVIDER,
      useClass: QdrantService,
    },
    QdrantService,
  ],
  exports: [VECTOR_STORE_PROVIDER, QdrantService],
})
export class QdrantModule {}
