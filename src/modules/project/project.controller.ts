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
import { PROJECT_RESPONSE_MESSAGES } from "src/common/constants/response.constant";
import { ResponseMessage } from "src/common/decorators/response.decorator";
import { ListDto } from "src/common/dto/common.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectService } from "./project.service";
import { RoleGuard } from "src/security/auth/guards/role.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/constants/enum.constant";

@Controller("project")
@ApiTags("Project")
@ApiBearerAuth()
@UseGuards(RoleGuard)
@Roles(UserRole.ADMIN, UserRole.USER)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post("create")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_INSERTED)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.create(createProjectDto);
  }

  @Post("list")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_FETCHED)
  async findAll(@Body() listDto: ListDto) {
    return await this.projectService.findAll(listDto);
  }

  @Post("update/:id")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_UPDATED)
  async updateProject(
    @Param("id") id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.update(id, updateProjectDto);
  }

  @Delete("delete/:id")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_DELETED)
  async removeProject(@Param("id") id: number) {
    return await this.projectService.remove(id);
  }

  @Get("get/:id")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_FETCHED)
  async getProjectByName(@Param("id") id: number) {
    return await this.projectService.findOne(id);
  }

  @Post("status")
  @ResponseMessage(PROJECT_RESPONSE_MESSAGES.PROJECT_STATUS_CHANGED)
  async changeStatus(
    @Body() changeStatusDto: { projectId: number; status: string },
  ) {
    return await this.projectService.changeProjectStatus(
      changeStatusDto.projectId,
      changeStatusDto.status,
    );
  }
}