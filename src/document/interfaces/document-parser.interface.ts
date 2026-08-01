import { ParsedDocument } from './parsed-document.interface';

export interface DocumentParser {
  parse(filePath: string): Promise<ParsedDocument>;
}
