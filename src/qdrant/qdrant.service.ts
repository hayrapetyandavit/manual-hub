import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QdrantClient } from '@qdrant/js-client-rest';
import { QDRANT_COLLECTION } from 'src/common/constants';

@Injectable()
export class QdrantService implements OnModuleInit {
  private readonly logger = new Logger(QdrantService.name);
  private readonly collectionName = QDRANT_COLLECTION;

  private readonly client: QdrantClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new QdrantClient({
      url: this.configService.getOrThrow<string>('qdrantUrl'),
    });
  }

  async onModuleInit() {
    await this.checkConnection();
    await this.initCollection();
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

  private async initCollection() {
    try {
      const collections = await this.client.getCollections();

      const exists = collections.collections.some(
        (c) => c.name === this.collectionName,
      );

      if (!exists) {
        this.logger.log(`Creating collection ${this.collectionName}`);

        try {
          await this.client.createCollection(this.collectionName, {
            vectors: { size: 768, distance: 'Cosine' },
          });
        } catch (error) {
          if (error.status !== 409) {
            throw error;
          }

          this.logger.warn(`Collection ${this.collectionName} already exists`);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to init collection: ${error.message}`);
      throw error;
    }
  }

  async save(chunks: any[], embeddings: number[][]): Promise<void> {
    const points = chunks.map((chunk, i) => ({
      id: chunk.id,
      vector: embeddings[i],
      payload: {
        text: chunk.text,
        metadata: chunk.metadata,
      },
    }));

    await this.client.upsert(this.collectionName, { points });
  }

  async search(vector: number[], limit: number) {
    return this.client.search(this.collectionName, {
      vector,
      limit,
      with_payload: true,
    });
  }
}
