import { api } from "../api";
import type { Dependente } from "../../../../shared/types";

type GetDependentesInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetDependentesOutput = {
  total: number;
  dependentes: Dependente[];
  countSearched: number;
};

export async function getDependentes(
  id_integrante: number,
  params: GetDependentesInput = {}
): Promise<GetDependentesOutput> {
  const res = await api.get(`/dependentes/${id_integrante}`, {
    params,
  });
  const dependentes = res.data;
  return dependentes;
}
