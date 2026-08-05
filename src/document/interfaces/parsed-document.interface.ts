export interface ParsedDocument {
  id: string;
  name: string;
  text: string;
  metadata: {
    source: string;
    pageCount: number;
  };
}
