import { api } from "../api";
import { Integrante } from "../../../../shared/types";

export async function getIntegrante(id: number): Promise<Integrante> {
  const res = await api.get(`/integrantes/${id}`);
  const integrante = res.data[0];
  return integrante;
}
