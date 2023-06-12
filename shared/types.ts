export type Integrante = {
  id_integrante?: number;
  nome: string;
  cpf: string;
  data_nasc: Date;
  plano: string;
  resgate_ativo: boolean;
  desconto_farm: boolean;
  tel_cel: string;
  tel_res: string;
  email: string;
  num_carteirinha: string;
};

export type Dependente = {
  nome: string;
  data_nasc: Date;
  cpf: string;
  num_carteirinha: string;
  nome_integrante?: string;
  id_integrante?: number;
  id_dependente?: number;
};

export type FindParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};
