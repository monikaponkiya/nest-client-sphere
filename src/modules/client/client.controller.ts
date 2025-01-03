import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientStatus, EmployeeRole } from "src/common/constants/enum.constant";
import { CLIENT_RESPONSE_MESSAGES } from "src/common/constants/response.constant";
import { ResponseMessage } from "src/common/decorators/response.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/security/auth/guards/role.guard";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ListClientDto } from "./dto/list-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller("client")
@ApiTags("Client")
@ApiBearerAuth()
@Roles(
  EmployeeRole.ADMIN,
  EmployeeRole.SALES_MANAGER,
  EmployeeRole.SALES_EXECUTIVE,
)
@UseGuards(RoleGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post("create")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_INSERTED)
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Post("list")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_LISTED)
  async findAll(@Body() params: ListClientDto) {
    return await this.clientService.findAll(params);
  }

  @Get("get/:id")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_FETCHED)
  async findOne(@Param("id") id: number) {
    return await this.clientService.findOne(id);
  }

  @Post("update/:id")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_UPDATED)
  async update(
    @Param("id") id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Post("active-inactive")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_STATUS_CHANGED)
  async changeStatus(
    @Body() changeStatusDto: { clientId: number; status: ClientStatus },
  ) {
    return await this.clientService.changeStatus(
      changeStatusDto.clientId,
      changeStatusDto.status,
    );
  }

  @Delete("delete/:id")
  @ResponseMessage(CLIENT_RESPONSE_MESSAGES.CLIENT_DELETED)
  async remove(@Param("id") id: number) {
    return await this.clientService.remove(id);
  }
}
