import { z } from "zod";

export const signInSchema = z.object({
  email: z.string(),
  senha: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
