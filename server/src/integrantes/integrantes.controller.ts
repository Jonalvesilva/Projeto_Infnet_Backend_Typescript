import { IntegranteService } from "./integrantes.serv";
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
@JsonController("/integrantes")
export class IntegranteController {
  constructor(private readonly integranteService: IntegranteService) {}

  @Get()
  async getAll(@QueryParams() query: any) {
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const order_by = query.order_by as string | undefined;
    const direction = query.direction as string | undefined;
    const search =
      query.search !== undefined ? query.search.toString() : undefined;
    const response = await this.integranteService.getAll({
      limit,
      offset,
      search,
      order_by,
      direction,
    });
    return response;
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    const response = await this.integranteService.getById(Number(id));
    return response;
  }

  @Authorized()
  @Post()
  async add(@Body() body: any) {
    const response = await this.integranteService.add(body);
    return response;
  }

  @Authorized()
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const response = await this.integranteService.delete(Number(id));
    return response;
  }

  @Authorized()
  @Put("/:id")
  async edit(@Param("id") id: string, @Body() body: any) {
    const response = await this.integranteService.edit(Number(id), body);
    return response;
  }
}
