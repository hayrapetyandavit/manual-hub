export const VECTOR_STORE_PROVIDER = 'VECTOR_STORE_PROVIDER';

export interface ScoredChunk {
  id: string;
  text: string;
  metadata: Record<string, any>;
  score: number;
}

export interface VectorStore {
  save(chunks: any[], embeddings: number[][]): Promise<void>;
  search(queryEmbedding: number[], limit?: number): Promise<ScoredChunk[]>;
}
