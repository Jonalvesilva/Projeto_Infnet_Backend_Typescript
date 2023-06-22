import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { LinkButton } from "../../components/LinkButton";
import { Integrante } from "../../../../shared/types";
import "../../App.css";
import { SearchBar } from "../../components/SearchBar";
import { config } from "../../config";
import { getIntegrantes } from "../../api/integrantes/getIntegrantes";
import { asyncDebounce } from "../../asyncDebounce";
import { PaginationButtons } from "../../components/PaginationButtons";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { TabelaIntegrantes } from "../../components/TabelaIntegrantes";

const pageSize = config.pageSize;
const debouncedGetNotepads = asyncDebounce(getIntegrantes, 1000);

const initialIntegrantesList = {
  totalIntegrantes: 0,
  integrantes: [] as Integrante[],
  countSearched: 0,
};

const headers = [
  "Carteririnha",
  "Integrante",
  "Data Nascimento",
  "CPF",
  "Plano",
  "Resgate",
  "Desconto Farmácia",
  "Opções",
];

export function IntegrantesView() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("nome");
  const [direction, setDirection] = useState("desc");
  const [integrantesList, setIntegrantesList] = useState(
    initialIntegrantesList
  );

  const [page, setPage] = useState(1);
  const offset = pageSize * (page - 1);

  const pageCount = Math.ceil(integrantesList.countSearched / pageSize);

  const getIntegrantesParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  useEffect(() => {
    debouncedGetNotepads(getIntegrantesParams).then(setIntegrantesList);
    console.log(integrantesList);
    setPage(1);
  }, [direction, orderBy, search]);

  useEffect(() => {
    debouncedGetNotepads({ ...getIntegrantesParams, offset }).then(
      setIntegrantesList
    );
  }, [page]);

  return (
    <div>
      <Breadcrumbs
        links={[{ title: "Página inicial", link: "/" }]}
      ></Breadcrumbs>
      <div className="bg-white w-11/12 h-full rounded-xl mx-auto mt-10 p-3 md:max-w-[1000px]">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="p-3 flex justify-start items-center grow">
            <h2 className="text-xl">
              Integrantes - Total: {integrantesList.countSearched} de{" "}
              {integrantesList.totalIntegrantes}
            </h2>
          </div>
          <div className="flex">
            <LinkButton
              to="/integrantes/addIntegrantes"
              className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-500"
            >
              Adicionar Integrante
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
        <TabelaIntegrantes head={headers} rows={integrantesList.integrantes} />
        <div>
          <PaginationButtons
            currentPage={page}
            pageCount={pageCount}
            onClick={(event) => {
              let target = event.target as HTMLInputElement;
              setPage(Number(target.value));
            }}
          ></PaginationButtons>
        </div>
      </div>
    </div>
  );
}
