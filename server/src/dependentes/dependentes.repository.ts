import { RepositoryDependente } from "../types";
import type {
  DependenteGetOutput,
  DependenteMaybeOutput,
  Params,
} from "../types";
import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { Service } from "typedi";
import type { Dependente, FindParams } from "../../../shared/types";
import { normalizeText, createSearchSql } from "./functions/functions";
import * as schema from "./schemas/createDependenteSchema";

@Service()
export class DependentesRepository implements RepositoryDependente<Dependente> {
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
    const pool = await getPool();

    const sqlSearch =
      search !== ""
        ? createSearchSql(normalizeText(search))
        : sqlObj.fragment``;

    const sqlDirection =
      direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

    const sqlOrderBy = sql`order by ${sqlObj.identifier([
      order_by,
    ])} ${sqlDirection}`;

    let dependentes;
    let totalDependentes;

    try {
      dependentes = (await pool.many(
        sql`SELECT t1.*,t2.nome as nome_integrante from public.dependentes t1 JOIN public.integrantes t2 on t1.id_integrante = t2.id_integrante
      where t1.id_integrante=${id_integrante} ${sqlSearch} ${sqlOrderBy}`
      )) as any;

      totalDependentes = await pool.one(
        sql`SELECT count(id_dependente) from public.dependentes where id_integrante = ${id_integrante}`
      );
    } catch {
      return {
        dependentes: [] as Dependente[],
        totalDependentes: 0,
      };
    }
    return {
      dependentes: dependentes,
      totalDependentes: totalDependentes.count,
    };
  }
  async getById(id_dependente: number): Promise<Dependente> {
    const pool = await getPool();
    const dependente = await pool.one(
      sql`SELECT * from public.dependentes where id_dependente = ${id_dependente}`
    );
    return dependente;
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
    const pool = await getPool();

    const insertDependente = await pool.one(
      sql`Insert into public.dependentes (id_integrante, nome,data_nasc,cpf) values (${id_integrante},${nome},${data_nasc.toISOString()},${cpf}) returning *`
    );

    return { success: true, data: insertDependente, errors: null };
  }
  async delete(
    id_dependente: number
  ): Promise<DependenteMaybeOutput<Dependente>> {
    const pool = await getPool();
    try {
      const dependente = await pool.one(
        sql`SELECT * from public.dependentes where id_dependente=${id_dependente}`
      );

      const results = await pool.query(sql`
    delete from public.dependentes where id_dependente = ${id_dependente}
  `);
      const success = results.rowCount === 1;

      return {
        success: true,
        data: dependente,
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
    const pool = await getPool();
    const { nome, data_nasc, cpf } = validation.data;

    const editDependente = await pool.one(
      sql`update public.dependentes set nome=${nome}, data_nasc=${data_nasc.toISOString()}, cpf=${cpf} where id_dependente=${id_dependente} returning *`
    );

    return { success: true, data: editDependente, errors: null };
  }
}
