export interface VectorPoint {
  id: string;
  vector: number[];
  payload: Record<string, unknown>;
}

export interface VectorStore {
  save(points: VectorPoint[]): Promise<void>;
  search(vector: number[], limit: number): Promise<any[]>;
}
