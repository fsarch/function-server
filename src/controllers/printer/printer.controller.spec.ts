import { Test, TestingModule } from '@nestjs/testing';
import { PrinterController } from './printer.controller.js';
import { PrinterService } from '../../repositories/printer/printer.service.js';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe('PrinterController', () => {
  let controller: PrinterController;
  let service: PrinterService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockPrinterService = {
    printPdf: jest.fn(),
    printMaterialTracing: jest.fn(),
    printProduct: jest.fn(),
    getPrintJobStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrinterController],
      providers: [
        {
          provide: PrinterService,
          useValue: mockPrinterService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<PrinterController>(PrinterController);
    service = module.get<PrinterService>(PrinterService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('printPdf', () => {
    it('should call printer service printPdf method', async () => {
      const mockRequest = {
        content: 'test content',
        options: {},
        pdfOptions: { format: 'A4' },
      };
      const mockResponse = {
        jobId: 'test-job-id',
        status: 'queued',
        createdAt: '2024-01-01T12:00:00Z',
      };

      mockPrinterService.printPdf.mockResolvedValue(mockResponse);

      const result = await controller.printPdf(mockRequest);

      expect(mockPrinterService.printPdf).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('printMaterialTracing', () => {
    it('should call printer service printMaterialTracing method', async () => {
      const mockRequest = {
        content: 'tracing content',
        options: {},
        tracingData: { batchNumber: 'BATCH001' },
      };
      const mockResponse = {
        jobId: 'test-job-id',
        status: 'queued',
        createdAt: '2024-01-01T12:00:00Z',
      };

      mockPrinterService.printMaterialTracing.mockResolvedValue(mockResponse);

      const result = await controller.printMaterialTracing(mockRequest);

      expect(mockPrinterService.printMaterialTracing).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('printProduct', () => {
    it('should call printer service printProduct method', async () => {
      const mockRequest = {
        content: 'product content',
        options: {},
        productData: { productId: 'PROD001' },
      };
      const mockResponse = {
        jobId: 'test-job-id',
        status: 'queued',
        createdAt: '2024-01-01T12:00:00Z',
      };

      mockPrinterService.printProduct.mockResolvedValue(mockResponse);

      const result = await controller.printProduct(mockRequest);

      expect(mockPrinterService.printProduct).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getPrintJobStatus', () => {
    it('should call printer service getPrintJobStatus method', async () => {
      const jobId = 'test-job-id';
      const mockResponse = {
        jobId,
        status: 'completed',
      };

      mockPrinterService.getPrintJobStatus.mockResolvedValue(mockResponse);

      const result = await controller.getPrintJobStatus(jobId);

      expect(mockPrinterService.getPrintJobStatus).toHaveBeenCalledWith(jobId);
      expect(result).toEqual(mockResponse);
    });
  });
});