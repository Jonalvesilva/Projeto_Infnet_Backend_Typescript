import { api } from "../api";
import type { Integrante } from "../../../../shared/types";

export type PutIntegranteInput = {
  nome: string;
  cpf: string;
  data_nasc: Date;
  plano: string;
  resgate_ativo: boolean;
  desconto_farm: boolean;
  tel_cel: string;
  tel_res: string;
  email: string;
};

export type PutIntegranteOutput = {
  success: boolean;
  integrante: Integrante;
};

export async function putIntegrante(
  id: number,
  integrante: PutIntegranteInput
): Promise<PutIntegranteOutput> {
  const res = await api.put(`/integrantes/${id}`, integrante);
  return res.data;
}
