/**
 * model for the Chuck Norris API response
 */
export interface ChuckNorrisFactResponse {
  type?: string;
  value?: Value;
}

export interface Value {
  id?: number;
  joke?: string;
  categories?: string[];
}
