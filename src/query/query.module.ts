import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { QueryController } from './query.controller';

@Module({
  imports: [EmbeddingModule, QdrantModule],
  providers: [QueryService],
  controllers: [QueryController],
})
export class QueryModule {}
