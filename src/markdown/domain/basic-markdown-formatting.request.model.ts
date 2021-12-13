export interface BasicMarkdownFormattingRequest {
  text?: string;
  parameters?: Parameters;
}

export interface Parameters {
  lineWidth?: number;
  stringsToBold?: string[];
  replacementPairs?: ReplacementPair[];
  foodFacts?: string[];
}

export interface ReplacementPair {
  [key: string]: string;
}
