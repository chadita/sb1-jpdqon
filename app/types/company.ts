export interface Company {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnae: {
    codigo: string;
    descricao: string;
  };
  endereco: {
    estado: string;
    cidade: string;
  };
}

export interface SearchParams {
  query: string;
  searchType: 'cnpj' | 'razaoSocial' | 'cnae';
  estado?: string;
  cidade?: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}