import "reflect-metadata";
import { IntegranteController } from "./integrantes/integrantes.controller";
import { DependenteController } from "./dependentes/dependentes.controller";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

const host = "0.0.0.0";
const port = 8080;
useContainer(Container);

const controllers = [IntegranteController, DependenteController];
createExpressServer({
  cors: true,
  controllers,
}).listen(port, host, () => {
  console.log(`Servidor Express iniciado em http://${host}:${port}`);
});
