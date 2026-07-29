import { Controller, Get } from '@nestjs/common';
import { QdrantService } from '../qdrant/qdrant.service';

@Controller('health')
export class HealthController {
  constructor(private readonly qdrantService: QdrantService) {}

  @Get()
  async health() {
    const qdrant = await this.qdrantService.checkConnection();

    return {
      status: 'ok',
      qdrant,
      timestamp: new Date().toISOString(),
    };
  }
}
