import type { Integrante } from "../../../shared/types";
import { LinkButton } from "./LinkButton";

export type field = {
  head: String[];
  rows: Integrante[];
};

function reformatDate(dateStr: string) {
  var dArr = dateStr.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
}

export function TabelaIntegrantes({ head, rows }: field) {
  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
      <thead className="text-white">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="bg-blue-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-6 sm:mb-0"
            >
              {head.map((dados, index) => {
                return (
                  <th key={index} className="p-2 text-center h-11">
                    {dados}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="flex-1 sm:flex-none">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="flex flex-col flex-no wrap sm:table-row mb-6 sm:mb-0"
            >
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.num_carteirinha}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.nome}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {reformatDate(element.data_nasc.toString())}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.cpf}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.plano}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.resgate_ativo.toString()}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.desconto_farm.toString()}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 flex gap-4 sm:text-center">
                <div>
                  <LinkButton
                    to={`/integrantes/${element.id_integrante}`}
                    key={element.id_integrante}
                    className="bg-green-600 p-1 text-white rounded-lg"
                  >
                    Perfil
                  </LinkButton>
                </div>
                <div>
                  <LinkButton
                    to={`/dependentes/${element.id_integrante}`}
                    key={element.id_integrante}
                    className="bg-blue-600 p-1 text-white rounded-lg"
                  >
                    Dependentes
                  </LinkButton>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
