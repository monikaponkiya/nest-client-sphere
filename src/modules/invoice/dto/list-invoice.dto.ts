import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { ListDto } from "src/common/dto/common.dto";

export class ListInvoiceDto extends ListDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  deletedInvoice: boolean;
}