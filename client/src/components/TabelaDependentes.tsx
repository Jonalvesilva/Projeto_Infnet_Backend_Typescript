import type { Dependente } from "../../../shared/types";
import { LinkButton } from "./LinkButton";

export type field = {
  head: String[];
  rows: Dependente[];
};

function reformatDate(dateStr: string) {
  const str = dateStr.slice(0, 10);
  const dArr = str.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
}

export function TabelaDependentes({ head, rows }: field) {
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
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 flex items-center justify-center gap-4 sm:text-center">
                <LinkButton
                  to={`/dependentes/${element.id_integrante}/${element.id_dependente}`}
                  key={element.id_dependente}
                  className="bg-green-600 px-2 text-white rounded-lg"
                >
                  Perfil
                </LinkButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
