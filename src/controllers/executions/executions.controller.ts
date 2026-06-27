import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExecutionService } from "../../repositories/execution/execution.service.js";
import { ExecutionCreateDto, ExecutionDto, ExecutionListDto } from "../../models/execution.model.js";
import { LogDto } from "../../models/log.model.js";
import { InjectRepository } from "@nestjs/typeorm";
import { LogEntity } from "../../database/entities/log.entity.js";
import { Repository } from "typeorm";

@ApiTags('executions')
@Controller({
  path: 'executions',
  version: '1',
})
@ApiBearerAuth()
export class ExecutionsController {
  public constructor(
    private readonly executionService: ExecutionService,
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  @Get()
  public async listAll(): Promise<Array<ExecutionListDto>> {
    return this.executionService.listAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<ExecutionDto> {
    const execution = await this.executionService.getById(id);
    if (!execution) {
      throw new Error('Execution not found');
    }
    return execution;
  }

  @Get('function/:functionId')
  public async listByFunction(@Param('functionId') functionId: string): Promise<Array<ExecutionListDto>> {
    return this.executionService.listByFunction(functionId);
  }

  @Post()
  public async create(@Body() createDto: ExecutionCreateDto): Promise<{ id: string; }> {
    return this.executionService.create(createDto);
  }

  @Get(':executionId/logs')
  public async listLogsByExecution(@Param('executionId') executionId: string): Promise<Array<LogDto>> {
    const logs = await this.logRepository.find({
      where: { executionId },
      order: { creationTime: 'ASC' },
    });
    return logs.map(LogDto.FromDbo);
  }
}
