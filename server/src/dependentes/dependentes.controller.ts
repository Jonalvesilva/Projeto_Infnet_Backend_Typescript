import { DependenteService } from "./dependentes.serv";
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  QueryParams,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/dependentes")
export class DependenteController {
  constructor(private readonly dependenteService: DependenteService) {}

  @Get("/:idIntegrante")
  async getAll(@Param("idIntegrante") id: string, @QueryParams() query: any) {
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const order_by = query.order_by as string | undefined;
    const direction = query.direction as string | undefined;
    const search =
      query.search !== undefined ? query.search.toString() : undefined;
    const response = await this.dependenteService.getAll(
      {
        limit,
        offset,
        search,
        order_by,
        direction,
      },
      Number(id)
    );
    return response;
  }

  @Get("/:idIntegrante/:id")
  async getById(@Param("id") id: string) {
    const response = await this.dependenteService.getById(Number(id));
    return response;
  }

  @Authorized()
  @Post("/:idIntegrante")
  async add(@Param("idIntegrante") id: string, @Body() body: any) {
    const response = await this.dependenteService.add(Number(id), body);
    return response;
  }

  @Authorized()
  @Delete("/:idIntegrante/:id")
  async delete(@Param("id") id: string) {
    const response = await this.dependenteService.delete(Number(id));
    return response;
  }

  @Authorized()
  @Put("/:idIntegrante/:id")
  async put(@Param("id") id: string, @Body() body: any) {
    const response = await this.dependenteService.edit(Number(id), body);
    return response;
  }
}
