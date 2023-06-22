import { api } from "../api";
import type { Integrante } from "../../../../shared/types";

export type PostIntegranteInput = {
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

export type PostIntegranteOutput = {
  success: boolean;
  integrante: Integrante;
};

export async function postIntegrante(
  integrante: PostIntegranteInput
): Promise<PostIntegranteOutput> {
  const res = await api.post(`/integrantes/`, integrante);

  return res.data;
}
