import { z } from "zod";

const errors = {
  minLengthTelRes(prop: string, min: number) {
    return `O ${prop} precisa ter no mínimo ${min} números.`;
  },

  maxLengthTelRes(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} números.`;
  },

  minLengthTelCel(prop: string, min: number) {
    return `O ${prop} precisa ter no mínimo ${min} números.`;
  },

  maxLengthTelCel(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} números.`;
  },
};

export const telResSchema = z
  .string()
  .min(10, {
    message: errors.minLengthTelRes("telefone residencial", 10),
  })
  .max(10, {
    message: errors.maxLengthTelRes("telefone celular", 10),
  });

export const telCelSchema = z
  .string()
  .min(10, {
    message: errors.minLengthTelCel("telefone celular", 10),
  })
  .max(11, {
    message: errors.maxLengthTelCel("telefone celular", 11),
  });

export const emailSchema = z.string().email({ message: "Email Inválido" });
