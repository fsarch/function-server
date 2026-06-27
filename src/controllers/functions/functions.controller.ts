import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { FunctionCreateDto, FunctionDto, FunctionPatchDto } from "../../models/function.model.js";
import { FunctionService } from "../../repositories/function/function.service.js";

@ApiTags('functions')
@Controller({
  path: 'functions',
  version: '1',
})
@ApiBearerAuth()
export class FunctionsController {
  public constructor(
    private readonly functionService: FunctionService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List all functions',
    description: 'Returns a list of all functions with their configuration settings',
  })
  @ApiOkResponse({ type: [FunctionDto], description: 'List of functions' })
  public async List(): Promise<Array<FunctionDto>> {
    const functions = await this.functionService.ListServices();

    return functions.map(FunctionDto.FromDbo);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific function',
    description: 'Returns details of a specific function by ID',
  })
  @ApiParam({ name: 'id', description: 'UUID of the function', type: String })
  @ApiOkResponse({ type: FunctionDto, description: 'Function details' })
  @ApiNotFoundResponse({ description: 'Function not found' })
  public async GetById(@Param('id') id: string): Promise<FunctionDto> {
    const functionEntity = await this.functionService.GetById(id);
    return FunctionDto.FromDbo(functionEntity);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new function',
    description: 'Creates a new function with the provided configuration',
  })
  @ApiBody({ type: FunctionCreateDto, description: 'Function data to create' })
  @ApiCreatedResponse({ type: Object, description: 'Created function ID' })
  public async Create(@Body() createDto: FunctionCreateDto): Promise<{ id: string; }> {
    const createdFunction = await this.functionService.Create(createDto);

    return {
      id: createdFunction.id,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a function',
    description: 'Partially updates a function by ID. Only provided fields will be changed.',
  })
  @ApiParam({ name: 'id', description: 'UUID of the function to update', type: String })
  @ApiBody({ type: FunctionPatchDto, description: 'Function fields to update' })
  @ApiOkResponse({ type: FunctionDto, description: 'Updated function' })
  public async Patch(@Param('id') id: string, @Body() patchDto: FunctionPatchDto): Promise<FunctionDto> {
    const patchedFunction = await this.functionService.Patch(id, patchDto);
    return FunctionDto.FromDbo(patchedFunction);
  }
}
