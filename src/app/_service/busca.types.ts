export interface BuscaItem {
  id?: number | string;
  titulo: string;
  descricao: string;
  tipo?: string;
  url?: string;
}

export interface BuscaTextoResponse {
  results: BuscaItem[];
}

export interface BuscaVozResponse {
  transcription?: string;
  results: BuscaItem[];
}