import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QdrantClient } from '@qdrant/js-client-rest';

@Injectable()
export class QdrantService implements OnModuleInit {
  private readonly logger = new Logger(QdrantService.name);

  private readonly client: QdrantClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new QdrantClient({
      url: this.configService.getOrThrow<string>('qdrantUrl'),
    });
  }

  async onModuleInit() {
    await this.checkConnection();
  }

  getClient() {
    return this.client;
  }

  async checkConnection(): Promise<boolean> {
    try {
      const collections = await this.client.getCollections();

      this.logger.log(
        `Connected to Qdrant (${collections.collections.length} collections)`,
      );

      return true;
    } catch (error) {
      this.logger.error('Cannot connect to Qdrant', error);

      throw error;
    }
  }
}
