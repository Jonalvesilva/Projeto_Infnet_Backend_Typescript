import type { Dependente, FindParams } from "../../../shared/types";
import { DependentesRepository } from "./dependentes.repository";
import { Service } from "typedi";

@Service()
export class DependenteService {
  constructor(private readonly dependentesRepository: DependentesRepository) {}

  async getAll(
    { search = "", order_by = "nome", direction = "desc" }: FindParams = {},
    id_integrante: number
  ) {
    const response = await this.dependentesRepository.getAll(
      { order_by, search, direction },
      id_integrante
    );
    return response;
  }

  async getById(id_dependente: number) {
    const response = await this.dependentesRepository.getById(id_dependente);
    return response;
  }

  async add(idIntegrante: number, dependente: Dependente) {
    const response = await this.dependentesRepository.add(
      idIntegrante,
      dependente
    );
    return response;
  }

  async delete(id_dependente: number) {
    const response = await this.dependentesRepository.delete(id_dependente);
    return response;
  }

  async edit(id_dependente: number, dependente: Dependente) {
    const response = await this.dependentesRepository.edit(
      id_dependente,
      dependente
    );
    return response;
  }
}
