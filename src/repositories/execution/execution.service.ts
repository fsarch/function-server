import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { ExecutionEntity } from "../../database/entities/execution.entity.js";
import { LogEntity } from "../../database/entities/log.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { ExecutionCreateDto, ExecutionListDto, ExecutionDto } from '../../models/execution.model.js';
import { LogCreateDto } from '../../models/log.model.js';

@Injectable()
export class ExecutionService {
  constructor(
    @InjectRepository(ExecutionEntity)
    private readonly executionRepository: Repository<ExecutionEntity>,
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  public async listByFunction(functionId: string): Promise<Array<ExecutionListDto>> {
    const executions = await this.executionRepository.find({
      where: { functionId },
      order: { creationTime: 'DESC' },
    });
    return executions.map(ExecutionListDto.FromDbo);
  }

  public async listAll(): Promise<Array<ExecutionListDto>> {
    const executions = await this.executionRepository.find({
      order: { creationTime: 'DESC' },
    });
    return executions.map(ExecutionListDto.FromDbo);
  }

  public async getById(id: string): Promise<ExecutionDto | null> {
    const execution = await this.executionRepository.findOne({
      where: { id },
    });
    if (!execution) {
      return null;
    }
    return ExecutionDto.FromDbo(execution);
  }

  public async create(createDto: ExecutionCreateDto): Promise<{ id: string; }> {
    const execution = this.executionRepository.create({
      id: crypto.randomUUID(),
      functionId: createDto.functionId,
      isSuccess: createDto.isSuccess,
      arguments: createDto.arguments,
      response: createDto.response,
    });

    const savedExecution = await this.executionRepository.save(execution);

    // Create logs if provided
    if (createDto.logs && createDto.logs.length > 0) {
      const logs = createDto.logs.map((log: LogCreateDto) => this.logRepository.create({
        id: crypto.randomUUID(),
        executionId: savedExecution.id,
        logLevelId: log.logLevelId ?? 0,
        message: log.message,
        data: log.data,
      }));
      await this.logRepository.save(logs);
    }

    return { id: savedExecution.id };
  }
}
