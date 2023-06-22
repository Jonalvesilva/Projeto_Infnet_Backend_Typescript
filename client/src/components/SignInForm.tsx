import { TextField } from "./TextField";
import { LinkButton } from "./LinkButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { signIn } from "../api/signIn";
import "react-simple-toasts/dist/theme/dark.css";
import { Toast } from "./Toast";
import { useGlobalStore } from "../useGlobalStore";
import { FiLoader } from "react-icons/fi";
import { AuthToken } from "../authToken";

export function SignInForm() {
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const setFuncionario = useGlobalStore((state) => state.setFuncionario);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const response = await signIn(email, senha);
    if (response.success) {
      AuthToken.set(response.jwt);
      setIsAuthenticated(true);
      setFuncionario(response.funcionario);
      toast("Login efetuado com sucesso", {
        render: (message) => (
          <Toast
            className="bg-green-800 p-4 text-white text-lg md:text-xl rounded-full"
            message={message}
          />
        ),
      });
      navigate("/home");
    } else {
      toast("Email ou senha inválidos", {
        render: (message) => (
          <Toast
            className="bg-red-600 p-4 text-white text-lg md:text-xl rounded-full"
            message={message}
          />
        ),
      });
    }
  }

  return (
    <div className="bg-white w-[90%] mx-auto mt-[150px] p-2 rounded-xl md:max-w-screen-md">
      <h2 className="text-xl font-bold text-center mb-6 mt-2">
        Área de Funcionários - Entrar
      </h2>
      <form
        method="POST"
        className="flex flex-col gap-2 w-[95%] mx-auto"
        noValidate
        onSubmit={onFormSubmit}
      >
        <label className="text-lg md:text-xl">Email:</label>
        <TextField
          placeholder="Digite seu email"
          className="mb-3 border-gray-200 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
          value={email}
          onChange={setEmail}
        />
        <label className="text-lg md:text-xl">Senha:</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          className="mb-3 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 rounded-xl p-2 my-4 hover:bg-blue-500 text-white"
        >
          {isLoading ? (
            <FiLoader className="text-white animate-spin text-lg inline" />
          ) : (
            `Entrar`
          )}
        </button>
      </form>
      <div className="text-center mb-2">
        <LinkButton
          to="/cadastro"
          className="text-blue-600 hover:text-blue-400 text-lg text-center md:text-xl underline"
        >
          Não possui cadastro? Cadastre-se aqui!
        </LinkButton>
      </div>
    </div>
  );
}
