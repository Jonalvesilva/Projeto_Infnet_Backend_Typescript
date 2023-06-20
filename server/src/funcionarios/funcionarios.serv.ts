import { Service } from "typedi";
import { FuncionarioRepository } from "./funcionarios.repository";
import { Funcionario } from "./funcionarios.types";

@Service()
export class FuncionarioService {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async create(userData: Omit<Funcionario, "id">) {
    const funcionario = await this.funcionarioRepository.add(userData);
    return funcionario.data as Funcionario;
  }

  async findByEmail(email: string) {
    const funcionario = await this.funcionarioRepository.findByEmail(email);
    return funcionario;
  }
  async findByEmailPassword(email: string, password: string) {
    const funcionario = await this.funcionarioRepository.findByEmailPassword(
      email,
      password
    );
    return funcionario;
  }
}
