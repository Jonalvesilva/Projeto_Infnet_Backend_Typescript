import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { IntegranteController } from "./integrantes/integrantes.controller";
import { DependenteController } from "./dependentes/dependentes.controller";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

const host = process.env.HOST;
const port = process.env.PORT;
useContainer(Container);

const controllers = [IntegranteController, DependenteController];
createExpressServer({
  cors: true,
  controllers,
}).listen(port, host, () => {
  console.log(`Servidor Express iniciado em http://${host}:${port}`);
});
