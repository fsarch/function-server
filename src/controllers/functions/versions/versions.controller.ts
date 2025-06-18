import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
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
  public async List(
    @Param('functionId') functionId: string,
  ): Promise<Array<FunctionVersionDto>> {
    const functionVersions = await this.versionService.ListVersions(functionId);

    return functionVersions.map(FunctionVersionDto.FromDbo);
  }

  @Get('active')
  public async GetActiveVersion(
    @Param('functionId') functionId: string,
  ): Promise<FunctionVersionDto> {
    const functionVersion = await this.versionService.GetActiveVersion(functionId);

    return FunctionVersionDto.FromDbo(functionVersion);
  }

  @Get(':versionId')
  public async GetVersion(
    @Param('functionId') functionId: string,
    @Param('versionId') versionId: string,
  ): Promise<FunctionVersionDto> {
    const functionVersion = await this.versionService.GetVersion(functionId, versionId);

    return FunctionVersionDto.FromDbo(functionVersion);
  }

  @Put()
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
