import { Injectable } from '@nestjs/common';
import ollama from 'ollama';

@Injectable()
export class OllamaEmbeddingProvider {
  async embed(text: string): Promise<number[]> {
    const response = await ollama.embed({
      model: 'nomic-embed-text',
      input: text,
    });

    return response.embeddings[0];
  }
}
