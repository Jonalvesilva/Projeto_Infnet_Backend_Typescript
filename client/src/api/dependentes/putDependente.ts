import { api } from "../api";
import type { Dependente } from "../../../../shared/types";

export type PutDependenteInput = {
  nome: string;
  cpf: string;
  data_nasc: Date;
};

export type PutDependenteOutput = {
  success: boolean;
  dependente: Dependente;
};

export async function putDependente(
  id: number,
  idDep: number,
  dependente: PutDependenteInput
): Promise<PutDependenteOutput> {
  const res = await api.put(`/dependentes/${id}/${idDep}`, dependente);
  return res.data;
}
