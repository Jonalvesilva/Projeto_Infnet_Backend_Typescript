import { ZodIssue } from "zod";

//Tipos Integrantes
export type IntegranteGetOutput<Entity> = {
  integrantes: Entity[];
  totalIntegrantes: number;
  countSearched: number;
};

export type IntegranteMaybeOutput<Entity> = {
  success: boolean;
  data: Entity | null;
  errors: ZodIssue[] | null;
};

//Tipos Dependentes//
export type DependenteGetOutput<Entity> = {
  dependentes: Entity[];
  totalDependentes: number;
};

export type DependenteMaybeOutput<Entity> = {
  success: boolean;
  data: Entity | null;
  errors: ZodIssue[] | null;
};

//Tipo Funcionario
export type FuncionarioMaybeOutput<Entity> = {
  success: boolean;
  data: Entity | null;
};

//Tipo Params
export type Params = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

//

//Interface Repository Integrante
export interface RepositoryIntegrante<Entity> {
  getAll(params: Params): Promise<IntegranteGetOutput<Entity>>;
  getById(id: number): Promise<Entity>;
  add(data: Partial<Entity>): Promise<IntegranteMaybeOutput<Entity>>;
  delete(id: number): Promise<IntegranteMaybeOutput<Entity>>;
  edit(
    id: number,
    data: Partial<Entity>
  ): Promise<IntegranteMaybeOutput<Entity>>;
}

//Interface Repository Dependente
export interface RepositoryDependente<Entity> {
  getAll(
    params: Params,
    id_integrante: number
  ): Promise<DependenteGetOutput<Entity>>;
  getById(id_dependente: number): Promise<Entity>;
  add(
    id_integrante: number,
    data: Partial<Entity>
  ): Promise<DependenteMaybeOutput<Entity>>;
  delete(id_dependente: number): Promise<DependenteMaybeOutput<Entity>>;
  edit(
    id_dependente: number,
    data: Partial<Entity>
  ): Promise<DependenteMaybeOutput<Entity>>;
}

//Interface Repository Funcionario
export interface RepositoryFuncionario<Entity> {
  findByEmailPassword(email: string, senha: string): Promise<Entity | null>;
  findByEmail(email: string): Promise<Entity | null>;
  add(data: Omit<Entity, string>): Promise<FuncionarioMaybeOutput<Entity>>;
}
