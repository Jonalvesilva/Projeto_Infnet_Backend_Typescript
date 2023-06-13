import { z } from "zod";
import * as integranteSchema from "./schema_modules/integranteSchema";
import * as contatoSchema from "./schema_modules/contatoSchema";
import * as serviceSchema from "./schema_modules/serviceSchema";

export const createIntegranteSchema = z.object({
  nome: integranteSchema.nameSchema,
  cpf: integranteSchema.cpfSchema,
  data_nasc: integranteSchema.dataNascSchema,
  tel_res: contatoSchema.telResSchema,
  tel_cel: contatoSchema.telCelSchema,
  email: contatoSchema.emailSchema,
  plano: serviceSchema.planoSchema,
  desconto_farm: serviceSchema.descontoFarmSchema,
  resgate_ativo: serviceSchema.resgateDomiciliarSchema,
});
