import { RepositoryIntegrante } from "../types";
import type { IntegranteGetOutput, IntegranteMaybeOutput } from "../types";
import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import type { Integrante, FindParams } from "../../../shared/types";
import { normalizeText, createSearchSql } from "./functions/functions";
import * as schema from "./schemas/createIntegranteSchema";

@Service()
export class IntegrantesRepository implements RepositoryIntegrante<Integrante> {
  constructor() {
    this.prisma = new PrismaClient();
  }

  prisma: PrismaClient;

  async getAll({
    limit = 5,
    offset = 0,
    search = "",
    order_by = "nome",
    direction = "desc",
  }: FindParams = {}): Promise<IntegranteGetOutput<Integrante>> {
    const sqlSearch =
      search !== "" ? createSearchSql(normalizeText(search)) : ``;

    const sqlDirection = direction.toLowerCase() === "desc" ? `desc` : `asc`;

    const sqlOrderBy = `order by "${order_by}" ${sqlDirection}`;

    let integrantes;
    let countSearched;
    let totalIntegrantes = await this.prisma.integrantes.count();

    try {
      integrantes = (await this.prisma
        .$queryRawUnsafe(`SELECT t1.*, t2.plano, t3.ativo AS resgate_ativo, t4.ativo AS desconto_farm,t5.* from public.integrantes t1 
        JOIN PUBLIC.plano t2 ON t1.id_integrante = t2.id_integrante 
        JOIN PUBLIC.resgate_domiciliar t3 ON t1.id_integrante = t3.id_integrante
        JOIN PUBLIC.desconto_farmacia t4 ON t1.id_integrante = t4.id_integrante
        JOIN PUBLIC.contato t5 ON t1.id_integrante = t5.id_integrante 
        ${sqlSearch} ${sqlOrderBy}
        limit ${limit} offset ${offset}`)) as any;
      countSearched = (await this.prisma.$queryRawUnsafe(
        `select count(*)::int from public.integrantes t1 ${sqlSearch}`
      )) as any;
    } catch (error) {
      return {
        integrantes: [] as Integrante[],
        totalIntegrantes: totalIntegrantes,
        countSearched: 0,
      };
    }

    return {
      integrantes: integrantes,
      totalIntegrantes: totalIntegrantes,
      countSearched: countSearched[0].count,
    };
  }

  async getById(id: number): Promise<Integrante> {
    const integrante = (await this.prisma.$queryRawUnsafe(`
    SELECT t1.*, t2.plano, t3.ativo AS resgate_ativo, t4.ativo AS desconto_farm,t5.* from public.integrantes t1 
    JOIN PUBLIC.plano t2 ON t1.id_integrante = t2.id_integrante 
    JOIN PUBLIC.resgate_domiciliar t3 ON t1.id_integrante = t3.id_integrante
    JOIN PUBLIC.desconto_farmacia t4 ON t1.id_integrante = t4.id_integrante 
    JOIN PUBLIC.contato t5 ON t1.id_integrante = t5.id_integrante 
    where t1.id_integrante=${id}
    `)) as any;
    return integrante;
  }

  async add(
    integrante: Partial<Integrante>
  ): Promise<IntegranteMaybeOutput<Integrante>> {
    //Validação de Dados
    const validation = await schema.createIntegranteSchema.safeParseAsync(
      integrante
    );
    if (validation.success === false) {
      return {
        success: false,
        data: null,
        errors: validation.error.errors,
      };
    }

    const {
      nome,
      cpf,
      data_nasc,
      tel_cel,
      tel_res,
      email,
      plano,
      resgate_ativo,
      desconto_farm,
    } = validation.data;

    //Insert Integrante
    let insert = false;

    try {
      await this.prisma.$queryRawUnsafe(`
    insert into public.integrantes (nome,data_nasc,cpf)
    values ('${nome}','${data_nasc.toISOString()}','${cpf}')
    returning *
  `);
      insert = true;
    } catch (error: any) {
      console.log(error);
      return { success: false, data: null, errors: [] };
    }

    //Se Insert do Integrante Ok - Adiciona as outras informações
    if (insert) {
      let newIntegranteId = (await this.prisma.$queryRawUnsafe(
        `SELECT MAX(id_integrante) FROM public.integrantes`
      )) as any;

      newIntegranteId = newIntegranteId[0].max;

      const insertContato = await this.prisma.$queryRawUnsafe(
        `insert into public.contato (id_integrante,tel_res,tel_cel,email) values(${newIntegranteId},'${tel_res}','${tel_cel}','${email}') returning *`
      );
      const insertPlano = await this.prisma.$queryRawUnsafe(
        `insert into public.plano (id_integrante,plano) values(${newIntegranteId},'${plano}') returning *`
      );
      const insertDescFarm = await this.prisma.$queryRawUnsafe(
        `insert into public.desconto_farmacia (id_integrante,ativo) values(${newIntegranteId},${desconto_farm}) returning *`
      );
      const insertResgateDom = await this.prisma.$queryRawUnsafe(
        `insert into public.resgate_domiciliar (id_integrante,ativo) values(${newIntegranteId},${resgate_ativo}) returning *`
      );
    }

    return {
      success: true,
      data: null,
      errors: [],
    };
  }

  async delete(id: number): Promise<IntegranteMaybeOutput<Integrante>> {
    try {
      const data = (await this.prisma.$queryRawUnsafe(
        `SELECT * from public.integrantes where id_integrante=${id}`
      )) as any;
      const results = await this.prisma.$queryRawUnsafe(
        `delete from public.integrantes where id_integrante = ${id}`
      );

      return {
        success: true,
        data: data,
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
    id: number,
    integrante: Partial<Integrante>
  ): Promise<IntegranteMaybeOutput<Integrante>> {
    //Validação de Dados
    const validation = await schema.createIntegranteSchema.safeParseAsync(
      integrante
    );
    if (validation.success === false) {
      return {
        success: false,
        data: null,
        errors: validation.error.errors,
      };
    }

    const {
      nome,
      cpf,
      data_nasc,
      tel_cel,
      tel_res,
      email,
      plano,
      resgate_ativo,
      desconto_farm,
    } = validation.data;

    const updateIntegrante = (await this.prisma.$queryRawUnsafe(
      `update public.integrantes set nome='${nome}',cpf='${cpf}',data_nasc='${data_nasc.toISOString()}' where id_integrante=${id} returning *`
    )) as any;

    const updateContato = (await this.prisma.$executeRawUnsafe(
      `update public.contato set tel_cel='${tel_cel}',tel_res='${tel_res}',email='${email}' where id_integrante=${id} returning *`
    )) as any;

    const updatePlano = (await this.prisma.$queryRawUnsafe(
      `update public.plano set plano='${plano}' where id_integrante=${id} returning *`
    )) as any;

    const updateResgate = (await this.prisma.$queryRawUnsafe(
      `update public.resgate_domiciliar set ativo=${resgate_ativo} where id_integrante=${id} returning *`
    )) as any;

    const updateDescFarm = (await this.prisma.$queryRawUnsafe(
      `update public.desconto_farmacia set ativo=${desconto_farm} where id_integrante=${id} returning *`
    )) as any;

    const result = {
      ...updateIntegrante[0],
      ...updateContato[0],
      ...updatePlano[0],
      resgate_ativo: updateResgate[0].ativo,
      desconto_farm: updateDescFarm[0].ativo,
    };
    return { success: true, data: result, errors: null };
  }
}
