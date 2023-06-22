import { api } from "../api";
import type { Integrante } from "../../../../shared/types";

type GetIntegrantesInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetIntegrantesOutput = {
  totalIntegrantes: number;
  integrantes: Integrante[];
  countSearched: number;
};

export async function getIntegrantes(
  params: GetIntegrantesInput = {}
): Promise<GetIntegrantesOutput> {
  const res = await api.get("/integrantes", {
    params,
  });
  const integrantes = res.data;
  return integrantes;
}
