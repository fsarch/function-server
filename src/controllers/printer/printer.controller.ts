import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  PdfPrintRequestDto,
  MaterialTracingPrintRequestDto,
  ProductPrintRequestDto,
  PrintResponseDto,
} from '../../models/printer.model.js';
import { PrinterService } from '../../repositories/printer/printer.service.js';

@ApiTags('printer')
@Controller({
  path: 'printer',
  version: '1',
})
@ApiBearerAuth()
export class PrinterController {
  public constructor(private readonly printerService: PrinterService) {}

  @Post('pdf')
  @ApiOperation({ summary: 'Print PDF document' })
  @ApiResponse({
    status: 201,
    description: 'PDF print job created successfully',
    type: PrintResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async printPdf(@Body() request: PdfPrintRequestDto): Promise<PrintResponseDto> {
    return this.printerService.printPdf(request);
  }

  @Post('materialTracing')
  @ApiOperation({ summary: 'Print material tracing document' })
  @ApiResponse({
    status: 201,
    description: 'Material tracing print job created successfully',
    type: PrintResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async printMaterialTracing(
    @Body() request: MaterialTracingPrintRequestDto,
  ): Promise<PrintResponseDto> {
    return this.printerService.printMaterialTracing(request);
  }

  @Post('product')
  @ApiOperation({ summary: 'Print product document' })
  @ApiResponse({
    status: 201,
    description: 'Product print job created successfully',
    type: PrintResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async printProduct(@Body() request: ProductPrintRequestDto): Promise<PrintResponseDto> {
    return this.printerService.printProduct(request);
  }

  @Get('jobs/:jobId/status')
  @ApiOperation({ summary: 'Get print job status' })
  @ApiResponse({
    status: 200,
    description: 'Print job status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        jobId: { type: 'string' },
        status: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Print job not found' })
  public async getPrintJobStatus(@Param('jobId') jobId: string): Promise<{ jobId: string; status: string }> {
    return this.printerService.getPrintJobStatus(jobId);
  }
}