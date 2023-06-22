import { api } from "../api";
import { Dependente } from "../../../../shared/types";

export async function getDependente(
  id: number,
  idDep: number
): Promise<Dependente> {
  const res = await api.get(`/dependentes/${id}/${idDep}`);
  const dependente = res.data;
  return dependente;
}
