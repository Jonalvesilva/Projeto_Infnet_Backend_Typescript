import { z } from "zod";
import * as dependenteSchema from "./schema_modules/dependenteSchema";

export const createDependenteSchema = z.object({
  nome: dependenteSchema.nameSchema,
  cpf: dependenteSchema.cpfSchema,
  data_nasc: dependenteSchema.dataNascSchema,
});
