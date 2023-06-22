import { api } from "./api";
import { Funcionario } from "../../../shared/types";

type SignInInput = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

type SignUpOutput =
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

export async function signUp(data: SignInInput): Promise<SignUpOutput> {
  const response = await api.post("/auth/sign-up", data);
  return response.data;
}
