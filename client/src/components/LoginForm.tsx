import { TextField } from "./TextField";
import { Button } from "./Button";

export function LoginForm() {
  return (
    <div className="bg-white w-[90%] mx-auto mt-[150px] p-2 rounded-xl md:max-w-screen-md">
      <h2 className="text-xl font-bold text-center mb-6 mt-2">
        Área de Funcionários - Login
      </h2>
      <form method="POST" className="flex flex-col gap-2 w-[95%] mx-auto">
        <label className="text-lg md:text-xl">Email:</label>
        <TextField
          placeholder="Digite seu email"
          className="mb-3 border-gray-200 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
        />
        <label className="text-lg md:text-xl">Senha:</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          className="mb-3 border-2 text-lg p-2 rounded-xl outline-none md:text-xl"
        />
        <button
          type="submit"
          className="bg-blue-700 rounded-xl p-2 my-4 hover:bg-blue-500 text-white"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
