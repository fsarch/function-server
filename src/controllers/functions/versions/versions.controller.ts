import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiNotFoundResponse, ApiConflictResponse } from "@nestjs/swagger";
import {
  FunctionVersionDto,
  FunctionVersionSetDto
} from "../../../models/function-version.model.js";
import { FunctionVersionService } from "../../../repositories/function-version/function-version.service.js";

@ApiTags('versions')
@Controller({
  path: 'functions/:functionId/versions',
  version: '1',
})
@ApiBearerAuth()
export class VersionsController {
  constructor(
    private readonly versionService: FunctionVersionService,
  ) {
  }

  @Get()
  @ApiOperation({
    summary: 'List all versions of a function',
    description: 'Returns a list of all versions for a specific function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiOkResponse({ type: [FunctionVersionDto], description: 'List of function versions' })
  public async List(
    @Param('functionId') functionId: string,
  ): Promise<Array<FunctionVersionDto>> {
    const functionVersions = await this.versionService.ListVersions(functionId);

    return functionVersions.map(FunctionVersionDto.FromDbo);
  }

  @Get('active')
  @ApiOperation({
    summary: 'Get active version of a function',
    description: 'Returns the currently active version for a specific function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiOkResponse({ type: FunctionVersionDto, description: 'Active function version' })
  @ApiNotFoundResponse({ description: 'No active version found' })
  public async GetActiveVersion(
    @Param('functionId') functionId: string,
  ): Promise<FunctionVersionDto> {
    const functionVersion = await this.versionService.GetActiveVersion(functionId);

    return FunctionVersionDto.FromDbo(functionVersion);
  }

  @Get(':versionId')
  @ApiOperation({
    summary: 'Get a specific version of a function',
    description: 'Returns a specific version by ID for a function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiParam({ name: 'versionId', description: 'UUID of the version', type: String })
  @ApiOkResponse({ type: FunctionVersionDto, description: 'Function version' })
  @ApiNotFoundResponse({ description: 'Version not found' })
  public async GetVersion(
    @Param('functionId') functionId: string,
    @Param('versionId') versionId: string,
  ): Promise<FunctionVersionDto> {
    const functionVersion = await this.versionService.GetVersion(functionId, versionId);

    return FunctionVersionDto.FromDbo(functionVersion);
  }

  @Put()
  @ApiOperation({
    summary: 'Create or update a function version',
    description: 'Creates a new version or updates an existing one for a function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiBody({ type: FunctionVersionSetDto, description: 'Version data to set' })
  @ApiCreatedResponse({ type: Object, description: 'Created version ID' })
  public async SetVersion(
    @Param('functionId') functionId: string,
    @Body() setDto: FunctionVersionSetDto,
  ): Promise<{ id: string; }> {
    const createdFunction = await this.versionService.Set(functionId, setDto);

    return {
      id: createdFunction.id,
    };
  }

  @Post('_actions/publish')
  @ApiOperation({
    summary: 'Publish the latest version',
    description: 'Publishes the latest version of a function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiCreatedResponse({ type: Object, description: 'Published version ID' })
  @ApiConflictResponse({ description: 'No version available to publish' })
  public async PublishLatestVersion(
    @Param('functionId') functionId: string,
  ): Promise<{ id: string; }> {
    const createdFunction = await this.versionService.PublishLatest(functionId);
    if (!createdFunction) {
      throw new ConflictException();
    }

    return {
      id: createdFunction.id,
    };
  }

  @Post(':versionId/_actions/publish')
  @ApiOperation({
    summary: 'Publish a specific version',
    description: 'Publishes a specific version of a function',
  })
  @ApiParam({ name: 'functionId', description: 'UUID of the function', type: String })
  @ApiParam({ name: 'versionId', description: 'UUID of the version to publish', type: String })
  @ApiCreatedResponse({ type: Object, description: 'Published version ID' })
  @ApiNotFoundResponse({ description: 'Version not found' })
  public async PublishVersion(
    @Param('functionId') functionId: string,
    @Param('versionId') versionId: string,
  ): Promise<{ id: string; }> {
    const createdFunction = await this.versionService.Publish(functionId, versionId);
    if (!createdFunction) {
      throw new NotFoundException();
    }

    return {
      id: createdFunction.id,
    };
  }
}
