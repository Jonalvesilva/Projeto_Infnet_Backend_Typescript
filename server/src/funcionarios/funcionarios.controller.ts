import {
  JsonController,
  Get,
  Param,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { Service } from "typedi";
import { Funcionario } from "./funcionarios.types";

@Service()
@JsonController("/funcionarios")
export class FuncionarioController {
  @Authorized()
  @Get("/auth/myself")
  async getMyself(@CurrentUser() funcionario: Funcionario) {
    return funcionario;
  }
}
