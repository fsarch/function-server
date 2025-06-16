import { ApiProperty } from "@nestjs/swagger";
import { FunctionVersion } from "../database/entities/function-version.entity.js";

export class FunctionVersionCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  externalId: string;

  @ApiProperty({
    required: false,
  })
  isActive: boolean;

  @ApiProperty({
    required: true,
  })
  code: string;

  @ApiProperty({
    required: false,
  })
  publishTime: string;
}

export class FunctionVersionSetDto {
  @ApiProperty({
    required: true,
  })
  code: string;
}

export class FunctionVersionDto {
  public static FromDbo(material: FunctionVersion): FunctionVersionDto {
    const materialDto = new FunctionVersionDto();

    materialDto.id = material.id;
    materialDto.functionId = material.functionId;
    materialDto.externalId = material.externalId;
    materialDto.isActive = material.isActive;
    materialDto.code = material.code;
    materialDto.publishTime = material.publishTime;
    materialDto.creationTime = material.creationTime;

    return materialDto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  functionId: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  publishTime?: Date;

  @ApiProperty()
  creationTime: Date;
}
