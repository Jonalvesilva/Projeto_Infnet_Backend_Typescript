import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { LinkButton } from "../../components/LinkButton";
import { Dependente } from "../../../../shared/types";
import "../../App.css";
import { SearchBar } from "../../components/SearchBar";
import { config } from "../../config";
import { getDependentes } from "../../api/dependentes/getDependentes";
import { asyncDebounce } from "../../asyncDebounce";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { TabelaDependentes } from "../../components/TabelaDependentes";

const pageSize = config.pageSize;
const debouncedGetNotepads = asyncDebounce(getDependentes, 1000);

const initialDependentesList = {
  total: 0,
  dependentes: [] as Dependente[],
  countSearched: 0,
};

const headers = [
  "Carteririnha",
  "Dependentes",
  "Data Nascimento",
  "CPF",
  "Opções",
];

export function DependentesView() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("nome");
  const [direction, setDirection] = useState("desc");
  const [dependentesList, setDependentesList] = useState(
    initialDependentesList
  );

  const params = useParams();

  const getDependentesParams = {
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  useEffect(() => {
    debouncedGetNotepads(Number(params.id), getDependentesParams).then(
      setDependentesList
    );
  }, [direction, orderBy, search]);

  return (
    <div>
      <Breadcrumbs
        links={[
          { title: "Página inicial", link: "/" },
          { title: "Integrantes", link: "/integrantes" },
        ]}
      ></Breadcrumbs>
      <div className="bg-white w-11/12 h-full rounded-xl mx-auto mt-10 p-3 md:max-w-[1000px]">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="p-3 flex flex-col items-center justify-start md:items-start grow">
            <h2 className="text-xl">{`ID Integrante: ${params.id}`}</h2>
            <h2 className="text-xl">Dependentes: {dependentesList.total}</h2>
          </div>
          <div className="flex">
            <LinkButton
              to={`/dependentes/${params.id}/addDependente`}
              className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-500"
            >
              Adicionar Dependente
            </LinkButton>
          </div>
        </div>
        <SearchBar
          search={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="w-full flex gap-10">
          <select
            value={orderBy}
            className="bg-transparent py-2 px-6 border rounded-3xl flex-1 focus:outline-none cursor-pointer"
            onChange={(event) => setOrderBy(event.target.value)}
          >
            <option value="nome">Nome</option>
            <option value="num_carteirinha">Carteirinha</option>
            <option value="cpf">CPF</option>
            <option value="data_nasc">Nascimento</option>
          </select>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value)}
            className="bg-white py-2 px-6 border rounded-3xl flex-1 cursor-pointer focus:outline-none"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <TabelaDependentes head={headers} rows={dependentesList.dependentes} />
      </div>
    </div>
  );
}
