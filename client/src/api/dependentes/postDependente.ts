import { api } from "../api";
import type { Dependente } from "../../../../shared/types";

export type PostDependenteInput = {
  nome: string;
  cpf: string;
  data_nasc: Date;
};

export type PostDependenteOutput = {
  success: boolean;
  dependente: Dependente;
};

export async function postDependente(
  dependente: PostDependenteInput,
  idIntegrante: number
): Promise<PostDependenteOutput> {
  const res = await api.post(`/dependentes/${idIntegrante}`, dependente);

  return res.data;
}
