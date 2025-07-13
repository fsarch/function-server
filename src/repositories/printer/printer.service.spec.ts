import { Test, TestingModule } from '@nestjs/testing';
import { PrinterService } from './printer.service.js';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe('PrinterService', () => {
  let service: PrinterService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrinterService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<PrinterService>(PrinterService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('printPdf', () => {
    it('should create a PDF print job successfully', async () => {
      const mockConfig = {
        type: 'http',
        url: 'http://localhost:8080/print',
      };
      mockConfigService.get.mockReturnValue(mockConfig);

      const request = {
        content: 'test content',
        options: {},
        pdfOptions: { format: 'A4' },
      };

      const result = await service.printPdf(request);

      expect(result).toHaveProperty('jobId');
      expect(result).toHaveProperty('status', 'queued');
      expect(result).toHaveProperty('createdAt');
    });

    it('should throw BadRequestException when printer config is missing', async () => {
      mockConfigService.get.mockReturnValue(null);

      const request = {
        content: 'test content',
        options: {},
        pdfOptions: { format: 'A4' },
      };

      await expect(service.printPdf(request)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when printer config is incomplete', async () => {
      const mockConfig = {
        type: 'http',
        // url is missing
      };
      mockConfigService.get.mockReturnValue(mockConfig);

      const request = {
        content: 'test content',
        options: {},
        pdfOptions: { format: 'A4' },
      };

      await expect(service.printPdf(request)).rejects.toThrow(BadRequestException);
    });
  });

  describe('printMaterialTracing', () => {
    it('should create a material tracing print job successfully', async () => {
      const mockConfig = {
        type: 'http',
        url: 'http://localhost:8080/print',
      };
      mockConfigService.get.mockReturnValue(mockConfig);

      const request = {
        content: 'tracing content',
        options: {},
        tracingData: { batchNumber: 'BATCH001' },
      };

      const result = await service.printMaterialTracing(request);

      expect(result).toHaveProperty('jobId');
      expect(result).toHaveProperty('status', 'queued');
      expect(result).toHaveProperty('createdAt');
    });
  });

  describe('printProduct', () => {
    it('should create a product print job successfully', async () => {
      const mockConfig = {
        type: 'http',
        url: 'http://localhost:8080/print',
      };
      mockConfigService.get.mockReturnValue(mockConfig);

      const request = {
        content: 'product content',
        options: {},
        productData: { productId: 'PROD001' },
      };

      const result = await service.printProduct(request);

      expect(result).toHaveProperty('jobId');
      expect(result).toHaveProperty('status', 'queued');
      expect(result).toHaveProperty('createdAt');
    });
  });

  describe('getPrintJobStatus', () => {
    it('should return print job status', async () => {
      const jobId = 'test-job-id';

      const result = await service.getPrintJobStatus(jobId);

      expect(result).toEqual({
        jobId,
        status: 'completed',
      });
    });
  });
});