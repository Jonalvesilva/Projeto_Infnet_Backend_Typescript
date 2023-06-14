import { IntegrantesRepository } from "./integrantes.repository";
import type { Integrante, FindParams } from "../../../shared/types";
import { Service } from "typedi";

@Service()
export class IntegranteService {
  constructor(private readonly integranteRepository: IntegrantesRepository) {}

  async getAll({
    limit = 5,
    offset = 0,
    search = "",
    order_by = "nome",
    direction = "desc",
  }: FindParams = {}) {
    const integrantes = await this.integranteRepository.getAll({
      limit,
      offset,
      search,
      order_by,
      direction,
    });
    return integrantes;
  }

  async getById(id: number) {
    const integrante = await this.integranteRepository.getById(id);
    return integrante;
  }

  async add(integrante: Integrante) {
    const insert = await this.integranteRepository.add(integrante);
    return insert;
  }

  async delete(id: number) {
    const del = await this.integranteRepository.delete(id);
    return del;
  }

  async edit(id: number, integrante: Integrante) {
    const update = await this.integranteRepository.edit(id, integrante);
    return update;
  }
}
