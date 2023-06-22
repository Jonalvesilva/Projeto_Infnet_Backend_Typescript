import { api } from "./api";
import { Funcionario } from "../../../shared/types";

type SignInOutput =
  | {
      success: false;
      jwt: null;
      funcionario: null;
    }
  | {
      success: true;
      jwt: string;
      funcionario: Funcionario;
    };

export async function signIn(
  email: string,
  senha: string
): Promise<SignInOutput> {
  const response = await api.post("/auth/sign-in", { email, senha });
  return response.data;
}
