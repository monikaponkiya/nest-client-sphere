import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { ListDto } from "src/common/dto/common.dto";

export class ListProjectDto extends ListDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isInternalProject: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  deletedProject: boolean;
}
