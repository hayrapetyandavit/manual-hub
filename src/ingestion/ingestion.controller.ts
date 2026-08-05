import { Controller, HttpCode, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingest')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post()
  @HttpCode(202)
  async ingest() {
    await this.ingestionService.ingest();
    return { message: 'Ingestion completed' };
  }
}
