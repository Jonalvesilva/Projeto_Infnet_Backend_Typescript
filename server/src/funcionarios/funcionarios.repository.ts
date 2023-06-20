import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { Funcionario } from "./funcionarios.types";
import { FuncionarioMaybeOutput, RepositoryFuncionario } from "../types";

@Service()
export class FuncionarioRepository
  implements RepositoryFuncionario<Funcionario>
{
  constructor() {
    this.prisma = new PrismaClient();
  }
  prisma: PrismaClient;

  async findByEmailPassword(
    email: string,
    senha: string
  ): Promise<Funcionario | null> {
    const funcionario = await this.prisma.funcionarios.findFirst({
      where: {
        email,
        senha,
      },
    });
    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario | null> {
    const funcionario = await this.prisma.funcionarios.findFirst({
      where: {
        email,
      },
    });
    return funcionario;
  }

  async add(
    data: Omit<Funcionario, "id">
  ): Promise<FuncionarioMaybeOutput<Funcionario>> {
    const funcionario = await this.prisma.funcionarios.create({ data });

    return {
      success: true,
      data: funcionario,
    };
  }
}
