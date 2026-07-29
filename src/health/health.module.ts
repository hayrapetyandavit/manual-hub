import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { QdrantModule } from '../qdrant/qdrant.module';

@Module({
  imports: [QdrantModule],
  controllers: [HealthController],
})
export class HealthModule {}
