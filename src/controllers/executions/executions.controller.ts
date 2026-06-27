import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiNotFoundResponse } from "@nestjs/swagger";
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
  @ApiOperation({
    summary: 'List all executions',
    description: 'Returns a list of all executions with basic information (id, creationTime, isSuccess)',
  })
  @ApiOkResponse({ type: [ExecutionListDto], description: 'List of executions' })
  public async listAll(): Promise<Array<ExecutionListDto>> {
    return this.executionService.listAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get execution details',
    description: 'Returns full details of a specific execution',
  })
  @ApiParam({ name: 'id', description: 'UUID of the execution', type: String })
  @ApiOkResponse({ type: ExecutionDto, description: 'Execution details' })
  @ApiNotFoundResponse({ description: 'Execution not found' })
  public async getById(@Param('id') id: string): Promise<ExecutionDto> {
    const execution = await this.executionService.getById(id);
    if (!execution) {
      throw new Error('Execution not found');
    }
    return execution;
  }

  @Get('function/:functionId')
  @ApiOperation({
    summary: 'List executions by function',
    description: 'Returns a list of executions filtered by function ID',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiOkResponse({ type: [ExecutionListDto], description: 'List of executions for the function' })
  public async listByFunction(@Param('functionId') functionId: string): Promise<Array<ExecutionListDto>> {
    return this.executionService.listByFunction(functionId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new execution',
    description: 'Creates a new execution with optional logs',
  })
  @ApiBody({ type: ExecutionCreateDto, description: 'Execution data to create' })
  @ApiCreatedResponse({ type: Object, description: 'Created execution ID' })
  public async create(@Body() createDto: ExecutionCreateDto): Promise<{ id: string; }> {
    return this.executionService.create(createDto);
  }

  @Get(':executionId/logs')
  @ApiOperation({
    summary: 'List logs by execution',
    description: 'Returns all logs for a specific execution, ordered by creation time',
  })
  @ApiParam({ name: 'executionId', description: 'UUID of the execution', type: String })
  @ApiOkResponse({ type: [LogDto], description: 'List of logs for the execution' })
  public async listLogsByExecution(@Param('executionId') executionId: string): Promise<Array<LogDto>> {
    const logs = await this.logRepository.find({
      where: { executionId },
      order: { creationTime: 'ASC' },
    });
    return logs.map(LogDto.FromDbo);
  }
}
