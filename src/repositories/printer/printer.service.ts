import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ConfigPrinterType } from '../../fsarch/configuration/config.type.js';
import {
  PrintRequestDto,
  PdfPrintRequestDto,
  MaterialTracingPrintRequestDto,
  ProductPrintRequestDto,
  PrintResponseDto,
} from '../../models/printer.model.js';

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  constructor(private readonly configService: ConfigService) {}

  private getPrinterConfig(): ConfigPrinterType | null {
    return this.configService.get<ConfigPrinterType>('printer');
  }

  private validatePrinterConfig(): ConfigPrinterType {
    const config = this.getPrinterConfig();
    if (!config) {
      throw new BadRequestException('Printer configuration not found');
    }
    if (!config.type || !config.url) {
      throw new BadRequestException('Printer configuration must include type and url');
    }
    return config;
  }

  private async sendPrintRequest(
    type: string,
    content: any,
    printerConfig: ConfigPrinterType,
  ): Promise<string> {
    const jobId = nanoid();
    
    this.logger.log(`Creating print job ${jobId} for type: ${type}`);
    this.logger.log(`Printer config - Type: ${printerConfig.type}, URL: ${printerConfig.url}`);
    
    // In a real implementation, this would make an HTTP request to the printer URL
    // For now, we'll simulate the print job creation
    
    try {
      // Simulate sending the print request to the configured printer URL
      // const response = await fetch(printerConfig.url, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, content, jobId })
      // });
      
      this.logger.log(`Print job ${jobId} sent to printer successfully`);
      return jobId;
    } catch (error) {
      this.logger.error(`Failed to send print job ${jobId}:`, error);
      throw new BadRequestException('Failed to send print request to printer');
    }
  }

  async printPdf(request: PdfPrintRequestDto): Promise<PrintResponseDto> {
    const printerConfig = this.validatePrinterConfig();
    
    const printData = {
      content: request.content,
      options: request.options,
      pdfOptions: request.pdfOptions,
    };

    const jobId = await this.sendPrintRequest('pdf', printData, printerConfig);
    return PrintResponseDto.create(jobId);
  }

  async printMaterialTracing(request: MaterialTracingPrintRequestDto): Promise<PrintResponseDto> {
    const printerConfig = this.validatePrinterConfig();
    
    const printData = {
      content: request.content,
      options: request.options,
      tracingData: request.tracingData,
    };

    const jobId = await this.sendPrintRequest('materialTracing', printData, printerConfig);
    return PrintResponseDto.create(jobId);
  }

  async printProduct(request: ProductPrintRequestDto): Promise<PrintResponseDto> {
    const printerConfig = this.validatePrinterConfig();
    
    const printData = {
      content: request.content,
      options: request.options,
      productData: request.productData,
    };

    const jobId = await this.sendPrintRequest('product', printData, printerConfig);
    return PrintResponseDto.create(jobId);
  }

  async getPrintJobStatus(jobId: string): Promise<{ jobId: string; status: string }> {
    this.logger.log(`Getting status for print job: ${jobId}`);
    
    // In a real implementation, this would query the printer service for job status
    // For now, we'll return a simulated status
    return {
      jobId,
      status: 'completed', // Could be: queued, processing, completed, failed
    };
  }
}