import { api } from "../api";
import { Integrante } from "../../../../shared/types";

export type DeleteIntegranteOutput = {
  success: boolean;
  integrante: Integrante;
};

export async function deleteIntegrante(
  id: number
): Promise<DeleteIntegranteOutput> {
  const res = await api.delete(`/integrantes/${id}`);
  const integrante = res.data;
  return integrante;
}
