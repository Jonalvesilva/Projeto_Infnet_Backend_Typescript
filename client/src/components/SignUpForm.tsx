import { TextField } from "./TextField";
import { LinkButton } from "./LinkButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { signUp } from "../api/signUp";
import "react-simple-toasts/dist/theme/dark.css";
import { Toast } from "./Toast";
import { useGlobalStore } from "../useGlobalStore";
import { FiLoader } from "react-icons/fi";
import { AuthToken } from "../authToken";

export function SignUpForm() {
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const setIsAuthenticated = useGlobalStore(
    (state) => state.setIsAuthenticated
  );
  const setFuncionario = useGlobalStore((state) => state.setFuncionario);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await signUp({ nome, sobrenome, email, senha });
    setIsLoading(true);

    if (response.success) {
      AuthToken.set(response.jwt);
      setIsLoading(false);
      setIsAuthenticated(true);
      setFuncionario(response.funcionario);
      toast("Conta criada com sucesso", {
        render: (message) => (
          <Toast
            className="bg-green-800 p-4 text-white text-lg md:text-xl rounded-full"
            message={message}
          />
        ),
      });
      navigate("/home");
    }
  }

  return (
    <div className="bg-white w-[90%] mx-auto mt-[150px] p-2 rounded-xl md:max-w-screen-md">
      <div className="flex flex-row justify-center items-center">
        <div className="w-full">
          <h2 className="text-xl font-bold text-center ml-12 mb-6 mt-2">
            Criar sua conta
          </h2>
        </div>
        <div className=" mb-5 mt-2">
          <LinkButton
            to="/"
            className="text-blue-600 hover:text-blue-400 text-lg font-bold mr-2 underline"
          >
            Voltar
          </LinkButton>
        </div>
      </div>
      <form
        method="POST"
        className="flex flex-col gap-2 w-[95%] mx-auto"
        noValidate
        onSubmit={onFormSubmit}
      >
        <label className="text-lg md:text-xl">Nome:</label>
        <TextField
          placeholder="Digite seu email"
          className="mb-3 border-gray-200 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
          value={nome}
          onChange={setNome}
        />

        <label className="text-lg md:text-xl">Sobrenome:</label>
        <TextField
          placeholder="Digite seu nome"
          className="mb-3 border-gray-200 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
          value={sobrenome}
          onChange={setSobrenome}
        />

        <label className="text-lg md:text-xl">Email:</label>
        <TextField
          placeholder="Digite seu sobrenome"
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
            `Cadastrar`
          )}
        </button>
      </form>
    </div>
  );
}
