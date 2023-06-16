import { RepositoryDependente } from "../types";
import type { DependenteGetOutput, DependenteMaybeOutput } from "../types";
import { PrismaClient } from "@prisma/client";
import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { Service } from "typedi";
import type { Dependente, FindParams } from "../../../shared/types";
import { normalizeText, createSearchSql } from "./functions/functions";
import * as schema from "./schemas/createDependenteSchema";

@Service()
export class DependentesRepository implements RepositoryDependente<Dependente> {
  constructor() {
    this.prisma = new PrismaClient();
  }

  prisma: PrismaClient;

  async getAll(
    {
      limit = 5,
      offset = 0,
      search = "",
      order_by = "nome",
      direction = "desc",
    }: FindParams = {},
    id_integrante: number
  ): Promise<DependenteGetOutput<Dependente>> {
    const sqlSearch =
      search !== "" ? createSearchSql(normalizeText(search)) : ``;

    const sqlDirection = direction.toLowerCase() === "desc" ? `desc` : `asc`;

    const sqlOrderBy = `order by "${order_by}" ${sqlDirection}`;

    let dependentes;
    let totalDependentes;

    try {
      dependentes = (await this.prisma
        .$queryRawUnsafe(`SELECT t1.*,t2.nome as nome_integrante from public.dependentes t1 JOIN public.integrantes t2 on t1.id_integrante = t2.id_integrante
      where t1.id_integrante=${id_integrante} ${sqlSearch} ${sqlOrderBy}`)) as any;
      totalDependentes = (await this.prisma.$queryRawUnsafe(
        `SELECT count(id_dependente)::int from public.dependentes where id_integrante = ${id_integrante}`
      )) as any;
    } catch {
      return {
        dependentes: [] as Dependente[],
        totalDependentes: 0,
      };
    }

    return {
      dependentes: dependentes,
      totalDependentes: totalDependentes[0].count,
    };
  }

  async getById(id_dependente: number): Promise<Dependente> {
    const dependente = (await this.prisma.$queryRawUnsafe(
      `SELECT * from public.dependentes where id_dependente = ${id_dependente}`
    )) as any;
    return dependente[0];
  }

  async add(
    id_integrante: number,
    dependente: Partial<Dependente>
  ): Promise<DependenteMaybeOutput<Dependente>> {
    //Validação dos Dados
    const validation = await schema.createDependenteSchema.safeParseAsync(
      dependente
    );
    if (validation.success === false) {
      return {
        success: false,
        data: null,
        errors: validation.error.errors,
      };
    }
    const { nome, data_nasc, cpf } = validation.data;

    const insertDependente = (await this.prisma.$queryRawUnsafe(
      `Insert into public.dependentes (id_integrante, nome,data_nasc,cpf) values (${id_integrante},'${nome}','${data_nasc.toISOString()}','${cpf}') returning *`
    )) as any;

    return { success: true, data: insertDependente[0], errors: null };
  }

  async delete(
    id_dependente: number
  ): Promise<DependenteMaybeOutput<Dependente>> {
    try {
      const dependente = (await this.prisma.$queryRawUnsafe(
        `SELECT * from public.dependentes where id_dependente=${id_dependente}`
      )) as any;
      await this.prisma.$queryRawUnsafe(
        `delete from public.dependentes where id_dependente = ${id_dependente}`
      );

      return {
        success: true,
        data: dependente[0],
        errors: null,
      };
    } catch {
      return {
        success: false,
        data: null,
        errors: null,
      };
    }
  }

  async edit(
    id_dependente: number,
    dependente: Partial<Dependente>
  ): Promise<DependenteMaybeOutput<Dependente>> {
    //Validação dos Dados
    const validation = await schema.createDependenteSchema.safeParseAsync(
      dependente
    );
    if (validation.success === false) {
      return {
        success: false,
        data: null,
        errors: validation.error.errors,
      };
    }
    const { nome, data_nasc, cpf } = validation.data;
    const editDependente = (await this.prisma.$queryRawUnsafe(
      `update public.dependentes set nome='${nome}', data_nasc='${data_nasc.toISOString()}', cpf='${cpf}' where id_dependente=${id_dependente} returning *`
    )) as any;
    return { success: true, data: editDependente[0], errors: null };
  }
}
