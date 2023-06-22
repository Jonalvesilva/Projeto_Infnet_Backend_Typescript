import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { useZorm } from "react-zorm";
import { createDependenteSchema } from "../../schemas/dependentes/createDependenteSchema";
import { TextField } from "../../components/TextField";
import { postDependente } from "../../api/dependentes/postDependente";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { TextNumber } from "../../components/TextNumber";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useGlobalStore } from "../../useGlobalStore";
import { FiLoader } from "react-icons/fi";

function getBreadcrumbs(id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Integrantes", link: `/integrantes/` },
    { title: "Dependentes", link: `/dependentes/${id}` },
  ];
}

export function CreateDependente() {
  const params = useParams();
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const zo = useZorm("createDependente", createDependenteSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const dependente = event.data;
      setIsLoading(true);
      const response = await postDependente(dependente, Number(params.id));
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        toast("O dependente foi criado com sucesso");
        navigate(`/dependentes/${params.id}`);
      } else {
        toast("Não foi possível criar o dependente");
      }
    },
  });

  const disabled = zo.validation?.success === false;

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs(Number(params.id))} />
      <h1 className="text-center font-bold italic text-white font-serif my-4 text-2xl md:text-3xl ">
        Adicionar Dependente
      </h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        ref={zo.ref}
        method="POST"
      >
        <label className="text-lg text-white">Nome:</label>
        <TextField
          placeholder="Digite o Nome"
          className={`nome h-12 rounded-xl px-2 my-2 text-lg ${zo.errors.nome(
            "border-red-500 focus:border-red-500"
          )}`}
          name={zo.fields.nome()}
        />
        {zo.errors.nome((error) => (
          <ErrorMessage message={error.message} />
        ))}

        <label className="text-lg text-white">CPF:</label>
        <TextNumber
          placeholder="Digite o CPF"
          className={`h-12 rounded-xl px-2 my-2 text-lg ${zo.errors.cpf(
            "border-red-500 focus:border-red-500"
          )}`}
          name={zo.fields.cpf()}
        />
        {zo.errors.cpf((error) => (
          <ErrorMessage message={error.message} />
        ))}

        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-col w-full">
            <label className="text-lg text-white">Data Nascimento</label>
            <input
              type="date"
              className={`h-12 rounded-xl px-2 my-2 text-lg ${zo.errors.data_nasc(
                "border-red-500 focus:border-red-500"
              )}`}
              name={zo.fields.data_nasc()}
            />
            {zo.errors.data_nasc((error) => (
              <ErrorMessage message={error.message} />
            ))}
          </div>

          <button
            disabled={disabled}
            type="submit"
            className="mt-7 w-full h-12 rounded-xl bg-green-700 text-white disabled:bg-gray-500 disabled:mt-3"
          >
            {isLoading ? (
              <FiLoader className="text-white animate-spin text-lg inline" />
            ) : (
              `Enviar`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
