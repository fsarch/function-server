import { ApiProperty } from "@nestjs/swagger";
import { FunctionEntity } from "../database/entities/function.entity.js";

export class FunctionCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  externalId: string;

  @ApiProperty({
    required: false,
    default: false,
  })
  enableDebugLogging: boolean;

  @ApiProperty({
    required: false,
    default: true,
  })
  enableErrorLogging: boolean;

  @ApiProperty({
    required: false,
    default: 3600,
  })
  retentionTimeSeconds: number;
}

export class FunctionPatchDto {
  @ApiProperty({
    required: false,
  })
  name?: string;

  @ApiProperty({
    required: false,
  })
  externalId?: string;

  @ApiProperty({
    required: false,
  })
  enableDebugLogging?: boolean;

  @ApiProperty({
    required: false,
  })
  enableErrorLogging?: boolean;

  @ApiProperty({
    required: false,
  })
  retentionTimeSeconds?: number;
}

export class FunctionDto {
  public static FromDbo(material: FunctionEntity): FunctionDto {
    const materialDto = new FunctionDto();

    materialDto.id = material.id;
    materialDto.name = material.name;
    materialDto.externalId = material.externalId;
    materialDto.enableDebugLogging = material.enableDebugLogging;
    materialDto.enableErrorLogging = material.enableErrorLogging;
    materialDto.retentionTimeSeconds = material.retentionTimeSeconds;
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
  enableDebugLogging: boolean;

  @ApiProperty()
  enableErrorLogging: boolean;

  @ApiProperty()
  retentionTimeSeconds: number;

  @ApiProperty()
  creationTime: Date;
}
