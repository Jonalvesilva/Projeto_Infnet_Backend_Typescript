import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { useZorm } from "react-zorm";
import { createIntegranteSchema } from "../../schemas/integrantes/createIntegranteSchema";
import { TextField } from "../../components/TextField";
import { getIntegrante } from "../../api/integrantes/getIntegrante";
import { putIntegrante } from "../../api/integrantes/putIntegrante";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { TextNumber } from "../../components/TextNumber";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useGlobalStore } from "../../useGlobalStore";
import { FiLoader } from "react-icons/fi";
import { RoutesAuthChecker } from "../../components/RoutesAuthChecker";
import { Toast } from "../../components/Toast";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/home" },
    { title: "Integrantes", link: `/integrantes/` },
    { title, link: `/integrantes/${id}` },
  ];
}

const date = new Date();

const initialIntegranteEdit = {
  nome: "",
  cpf: "",
  data_nasc: date,
  plano: "",
  resgate_ativo: false,
  desconto_farm: false,
  tel_cel: "",
  tel_res: "",
  email: "",
};

export function IntegranteEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const zo = useZorm("editIntegrante", createIntegranteSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const integrante = event.data;
      setIsLoading(true);
      const response = await putIntegrante(Number(params.id), integrante);
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        toast("O integrante foi editado com sucesso", {
          render: (message) => (
            <Toast
              className="bg-green-800 p-4 text-white text-lg md:text-xl rounded-full"
              message={message}
            />
          ),
        });
        navigate(`/integrantes/${params.id}`);
      } else {
        toast("Não foi possível editar o integrante", {
          render: (message) => (
            <Toast
              className="bg-red-600 p-4 text-white text-lg md:text-xl rounded-full"
              message={message}
            />
          ),
        });
      }
    },
  });

  const disabled = zo.validation?.success === false;

  const [integrantesEditValues, setIntegrantesValues] = useState(
    initialIntegranteEdit
  );

  useEffect(() => {
    getIntegrante(Number(params.id)).then((value) =>
      setIntegrantesValues(value)
    );
  }, []);

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs(`Perfil`, Number(params.id))} />
      <RoutesAuthChecker />
      <h1 className="text-center font-bold italic text-white font-serif my-4 text-2xl md:text-3xl ">
        Editar Integrante
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
          defaultValue={`${integrantesEditValues.nome}`}
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

        <label className="text-lg text-white">Email:</label>
        <TextField
          placeholder="Digite o Email"
          className={`h-12 rounded-xl px-2 my-2 text-lg ${zo.errors.email(
            "border-red-500 focus:border-red-500"
          )}`}
          name={zo.fields.email()}
        />
        {zo.errors.email((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-col w-full">
            <label className="text-lg text-white">Telefone:</label>
            <TextNumber
              placeholder="Digite o Telefone"
              className={`h-12 rounded-xl px-2 my-2 text-lg w-full ${zo.errors.tel_res(
                "border-red-500 focus:border-red-500"
              )}`}
              name={zo.fields.tel_res()}
            />
            {zo.errors.tel_res((error) => (
              <ErrorMessage message={error.message} />
            ))}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg text-white">Celular:</label>
            <TextNumber
              placeholder="Digite o Celular"
              className={`h-12 rounded-xl px-2 my-2 text-lg w-full ${zo.errors.tel_cel(
                "border-red-500 focus:border-red-500"
              )}`}
              name={zo.fields.tel_cel()}
            />
            {zo.errors.tel_cel((error) => (
              <ErrorMessage message={error.message} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-col w-full">
            <label className="text-lg text-white">Plano:</label>
            <select
              className={`h-12 rounded-xl px-2 my-2 text-lg ${zo.errors.plano(
                "border-red-500 focus:border-red-500"
              )}`}
              name={zo.fields.plano()}
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <label className="text-lg text-white">Resgate Domiciliar:</label>
            <input
              type="checkbox"
              className="h-4 w-4 mt-1"
              name={zo.fields.resgate_ativo()}
            ></input>
          </div>
          <div className="flex items-center gap-2 w-full">
            <label className="text-lg text-white">Desconto Farmácia:</label>
            <input
              type="checkbox"
              className="h-4 w-4 mt-1"
              name={zo.fields.desconto_farm()}
            ></input>
          </div>
        </div>
        <button
          disabled={disabled}
          type="submit"
          className="mt-2 w-full h-10 bg-green-700 text-white disabled:bg-gray-500"
        >
          {isLoading ? (
            <FiLoader className="text-white animate-spin text-lg inline" />
          ) : (
            `Enviar`
          )}
        </button>
      </form>
    </div>
  );
}
