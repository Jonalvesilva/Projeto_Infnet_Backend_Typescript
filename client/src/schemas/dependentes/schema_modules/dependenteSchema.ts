import { z } from "zod";

const errors = {
  minLengthName(prop: string, min: number) {
    return `O ${prop} precisa ter pelo menos ${min} caracteres.`;
  },
  maxLengthName(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} caracteres.`;
  },

  minLengthCpf(prop: string, min: number) {
    return `O ${prop} precisa ter no mínimo ${min} números.`;
  },

  maxLengthCpf(prop: string, max: number) {
    return `O ${prop} precisa ter no máximo ${max} números.`;
  },
};

export const nameSchema = z
  .string()
  .min(3, {
    message: errors.minLengthName("nome", 3),
  })
  .max(50, {
    message: errors.maxLengthName("nome", 50),
  });

export const cpfSchema = z
  .string()
  .min(11, {
    message: errors.minLengthCpf("cpf", 11),
  })
  .max(11, {
    message: errors.maxLengthCpf("cpf", 11),
  });

export const dataNascSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());
