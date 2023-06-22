import { z } from "zod";

export const planoSchema = z.string();

export const descontoFarmSchema = z.preprocess(
  (value) => value === "on",
  z.boolean()
);
export const resgateDomiciliarSchema = z.preprocess(
  (value) => value === "on",
  z.boolean()
);
