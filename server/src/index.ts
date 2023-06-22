import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { IntegranteController } from "./integrantes/integrantes.controller";
import { DependenteController } from "./dependentes/dependentes.controller";
import { FuncionarioController } from "./funcionarios/funcionarios.controller";
import { AuthController } from "./auth/auth.controller";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { currentUserChecker } from "./auth/checkers/currentUserChecker";

const host = process.env.HOST;
const port = process.env.PORT;
useContainer(Container);

const controllers = [
  IntegranteController,
  DependenteController,
  FuncionarioController,
  AuthController,
];
createExpressServer({
  cors: true,
  controllers,
  currentUserChecker,
  authorizationChecker,
}).listen(port, host, () => {
  console.log(`Servidor Express iniciado em http://${host}:${port}`);
});
