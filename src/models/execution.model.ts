import { ApiProperty } from "@nestjs/swagger";
import { ExecutionEntity } from "../database/entities/execution.entity.js";
import { LogCreateDto } from "./log.model.js";

// DTO für die List-Ansicht (nur id, creationTime, isSuccess)
export class ExecutionListDto {
  public static FromDbo(execution: ExecutionEntity): ExecutionListDto {
    const dto = new ExecutionListDto();
    dto.id = execution.id;
    dto.creationTime = execution.creationTime;
    dto.isSuccess = execution.isSuccess;
    return dto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  creationTime: Date;

  @ApiProperty()
  isSuccess: boolean;
}

// DTO für die Detail-Ansicht (alle Informationen)
export class ExecutionDto {
  public static FromDbo(execution: ExecutionEntity): ExecutionDto {
    const dto = new ExecutionDto();
    dto.id = execution.id;
    dto.functionId = execution.functionId;
    dto.isSuccess = execution.isSuccess;
    dto.arguments = execution.arguments;
    dto.response = execution.response;
    dto.creationTime = execution.creationTime;
    dto.deletionTime = execution.deletionTime;
    return dto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  functionId: string;

  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty({ type: Object, nullable: true })
  arguments?: Record<string, unknown>;

  @ApiProperty({ type: Object, nullable: true })
  response?: Record<string, unknown>;

  @ApiProperty()
  creationTime: Date;

  @ApiProperty({ nullable: true })
  deletionTime?: Date;
}

// DTO für das Erstellen einer Execution
export class ExecutionCreateDto {
  @ApiProperty()
  functionId: string;

  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty({ type: Object, nullable: true })
  arguments?: Record<string, unknown>;

  @ApiProperty({ type: Object, nullable: true })
  response?: Record<string, unknown>;

  @ApiProperty({ type: Array, nullable: true })
  logs?: Array<LogCreateDto>;
}


