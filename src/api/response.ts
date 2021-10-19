export interface MonicaResponse<Data = any> {
  data: Data;
  links: MonicaResponseLinks;
}

export interface MonicaResponseLinks {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface MonicaResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface MonicaDeletedResponse {
  deleted: boolean;
  id: number;
}
