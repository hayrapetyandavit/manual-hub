import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbeddingService } from 'src/embedding/services/embedding.service';
import {
  VectorStore,
  VECTOR_STORE_PROVIDER,
} from 'src/qdrant/interfaces/vector-store.interface';

@Injectable()
export class QueryService {
  private readonly logger = new Logger(QueryService.name);

  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly configService: ConfigService,
    @Inject(VECTOR_STORE_PROVIDER) private readonly vectorStore: VectorStore,
  ) {}

  async askQuestion(question: string): Promise<string> {
    this.logger.log(`Received question: ${question}`);

    const aiUrl = this.configService.getOrThrow<string>('AI_URL');
    const model = this.configService.getOrThrow<string>('AI_MODEL');

    // 1. Generate embedding for query
    const queryEmbedding = await this.embeddingService.embed(question);

    // 2. Retrieve relevant chunks
    const relevantChunks = await this.vectorStore.search(queryEmbedding, 5);

    if (relevantChunks.length === 0) {
      return 'I could not find any relevant information to answer your question.';
    }

    // 3. Construct prompt with context
    const contextText = relevantChunks
      .map(
        (chunk: any, index) =>
          `--- Chunk ${index + 1} ---\n${chunk.payload.text}\n`,
      )
      .join('\n');

    const prompt = `You are a helpful AI assistant answering questions about technical manuals.
                  Use the following pieces of retrieved context to answer the user's question.
                  If you don't know the answer based on the context, just say that you don't know. Do not make up an answer.

                  Context:
                  ${contextText}

                  Question: ${question}
                  Answer:`;

    // 4. Call LLM
    this.logger.log('Generating answer with LLM...');

    const response = await fetch(aiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${this.openAiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI request failed: ${response.status} ${error}`);
    }

    const data = await response.json();

    return data.choices[0].message?.content || '';
  }
}
