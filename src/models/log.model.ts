import { ApiProperty } from "@nestjs/swagger";
import { LogEntity } from "../database/entities/log.entity.js";

// DTO für Log-Einträge
export class LogCreateDto {
  @ApiProperty({ nullable: true, default: 0 })
  logLevelId?: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Object, nullable: true })
  data?: Record<string, unknown>;
}

// DTO für Log-Listenansicht
export class LogDto {
  public static FromDbo(log: LogEntity): LogDto {
    const dto = new LogDto();
    dto.id = log.id;
    dto.executionId = log.executionId;
    dto.logLevelId = log.logLevelId;
    dto.message = log.message;
    dto.data = log.data;
    dto.creationTime = log.creationTime;
    return dto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  executionId: string;

  @ApiProperty()
  logLevelId: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Object, nullable: true })
  data?: Record<string, unknown>;

  @ApiProperty()
  creationTime: Date;
}
