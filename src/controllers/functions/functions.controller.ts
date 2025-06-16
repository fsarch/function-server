import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FunctionCreateDto, FunctionDto } from "../../models/function.model.js";
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
  public async List(): Promise<Array<FunctionDto>> {
    const functions = await this.functionService.ListServices();

    return functions.map(FunctionDto.FromDbo);
  }

  @Post()
  public async Create(@Body() createDto: FunctionCreateDto): Promise<{ id: string; }> {
    const createdFunction = await this.functionService.Create(createDto);

    return {
      id: createdFunction.id,
    };
  }
}
