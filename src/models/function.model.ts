import { ApiProperty } from "@nestjs/swagger";
import { FunctionEntity } from "../database/entities/function.entity.js";

export class FunctionCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  externalId: string;
}

export class FunctionDto {
  public static FromDbo(material: FunctionEntity): FunctionDto {
    const materialDto = new FunctionDto();

    materialDto.id = material.id;
    materialDto.name = material.name;
    materialDto.externalId = material.externalId;
    materialDto.creationTime = material.creationTime;

    return materialDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  creationTime: Date;
}
