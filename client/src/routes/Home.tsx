import { LinkButton } from "../components/LinkButton";
import { RoutesAuthChecker } from "../components/RoutesAuthChecker";
export function Home() {
  return (
    <div className="flex flex-col items-center justify-center md:h-[750px]">
      <RoutesAuthChecker />
      <div className="w-full text-white py-12 px-2 flex justify-center text-xl text-center md:text-2xl lg:text-4xl">
        <h2>
          Para empresas e pessoas, o melhor plano para cuidar de sua saúde
        </h2>
      </div>
      <div className="w-[90%] flex flex-col md:flex-row md:max-w-[1200px] gap-10">
        <div className="w-full bg-white rounded-2xl p-4 flex flex-row md:flex-col items-center justify-evenly">
          <h3 className="text-md sm:text-2xl md:text-2xl lg:text-3xl md:text-center">
            Área Empresarial
          </h3>

          <LinkButton
            className="bg-green-700 hover:bg-green-600 p-4 text-sm text-white sm:text-2xl btn-text-shadow text-center rounded-xl"
            to="/integrantes"
          >
            Gerenciar Integrantes
          </LinkButton>
        </div>
        <div className="banner w-full h-full">
          <img src="./banner.jpg" className="w-full h-full rounded-2xl"></img>
        </div>
      </div>
    </div>
  );
}
