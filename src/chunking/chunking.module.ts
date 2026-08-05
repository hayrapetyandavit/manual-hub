import { Module } from '@nestjs/common';
import { TextChunkerService } from './services/text-chunker.service';

@Module({
  providers: [TextChunkerService],
  exports: [TextChunkerService],
})
export class ChunkingModule {}
