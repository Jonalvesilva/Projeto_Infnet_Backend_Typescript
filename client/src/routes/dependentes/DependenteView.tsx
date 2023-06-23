import { useState, useEffect } from "react";
import { LinkButton } from "../../components/LinkButton";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getDependente } from "../../api/dependentes/getDependente";
import { deleteDependente } from "../../api/dependentes/deleteDependente";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useGlobalStore } from "../../useGlobalStore";
import { FiLoader } from "react-icons/fi";
import { RoutesAuthChecker } from "../../components/RoutesAuthChecker";
import { Toast } from "../../components/Toast";

const texts = {
  deleteSuccess: "O dependente foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o dependente.",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
};

function reformatDate(dateStr: string) {
  const str = dateStr.slice(0, 10);
  const dArr = str.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
}

function getBreadcrumbs(idIntegrante: number) {
  return [
    { title: "Página inicial", link: "/home" },
    { title: "Integrantes", link: "/integrantes" },
    {
      title: `Dependentes`,
      link: `/dependentes/${idIntegrante}`,
    },
  ];
}

const date = new Date();
const emptyDependente = {
  nome: "",
  cpf: "",
  data_nasc: date,
  num_carteirinha: "",
};

export function DependenteView() {
  const params = useParams();
  const navigate = useNavigate();
  const [dependente, setDependente] = useState(emptyDependente);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);

  useEffect(() => {
    getDependente(Number(params.id), Number(params.idDep)).then((res) => {
      setDependente(res);
    });
  }, []);

  async function onClickDelete() {
    setIsLoading(true);
    const response = await deleteDependente(
      Number(params.id),
      Number(params.idDep)
    );
    setIsLoading(false);
    if (response.success) {
      toast(texts.deleteSuccess, {
        render: (message) => (
          <Toast
            className="bg-green-800 p-4 text-white text-lg md:text-xl rounded-full"
            message={message}
          />
        ),
      });
      navigate(`/dependentes/${params.id}`);
    } else {
      toast(texts.deleteFailure, {
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
    <div>
      <Breadcrumbs links={getBreadcrumbs(Number(params.id))}></Breadcrumbs>
      <RoutesAuthChecker />
      <Card className="bg-white w-[90%] m-auto p-4 leading-8 rounded-md my-8 md:max-w-screen-md">
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Número Carteirinha:</h2>
            {dependente.num_carteirinha}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Nome:</h2>
            {dependente.nome}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">CPF:</h2>
            {dependente.cpf}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Data Nascimento:</h2>
            {reformatDate(dependente.data_nasc.toString())}
          </span>
        </div>
        <div className="mt-8 flex flex-row gap-4">
          <button
            onClick={onClickDelete}
            className="bg-red-600 hover:bg-red-500 btn-text-shadow px-4 py-1 rounded-xl text-white"
          >
            {isLoading ? (
              <FiLoader className="text-white animate-spin text-lg inline" />
            ) : (
              `Deletar`
            )}
          </button>
          <LinkButton
            className="bg-green-600 hover:bg-green-500 btn-text-shadow px-5 py-1 rounded-xl text-white"
            to={`/dependentes/${params.id}/${params.idDep}/editar/`}
          >
            Editar
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
