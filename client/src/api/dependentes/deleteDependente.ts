import { api } from "../api";
import { Dependente } from "../../../../shared/types";

export type DeleteDependenteOutput = {
  success: boolean;
  dependente: Dependente;
};

export async function deleteDependente(
  id: number,
  idDep: number
): Promise<DeleteDependenteOutput> {
  const res = await api.delete(`/dependentes/${id}/${idDep}`);
  const dependente = res.data;
  return dependente;
}
