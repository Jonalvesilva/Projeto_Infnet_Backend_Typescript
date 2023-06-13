import { z } from "zod";

export const planoSchema = z.string();
export const descontoFarmSchema = z.boolean({
  invalid_type_error: "Formato Inválido",
});
export const resgateDomiciliarSchema = z.boolean({
  invalid_type_error: "Formato Inválido",
});
