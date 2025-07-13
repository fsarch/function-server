import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class PrintRequestDto {
  @ApiProperty({
    description: 'The content to be printed',
    example: 'Document content or data'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Additional options for printing',
    required: false,
    example: { format: 'A4', orientation: 'portrait' }
  })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>;
}

export class PdfPrintRequestDto extends PrintRequestDto {
  @ApiProperty({
    description: 'PDF specific options',
    required: false,
    example: { format: 'A4', margin: '10mm' }
  })
  @IsOptional()
  @IsObject()
  pdfOptions?: Record<string, any>;
}

export class MaterialTracingPrintRequestDto extends PrintRequestDto {
  @ApiProperty({
    description: 'Material tracing specific data',
    example: { batchNumber: 'BATCH001', materialId: 'MAT123' }
  })
  @IsObject()
  @IsNotEmpty()
  tracingData: Record<string, any>;
}

export class ProductPrintRequestDto extends PrintRequestDto {
  @ApiProperty({
    description: 'Product specific data',
    example: { productId: 'PROD001', quantity: 100 }
  })
  @IsObject()
  @IsNotEmpty()
  productData: Record<string, any>;
}

export class PrintResponseDto {
  @ApiProperty({
    description: 'Print job ID',
    example: 'print-job-123'
  })
  jobId: string;

  @ApiProperty({
    description: 'Status of the print job',
    example: 'queued'
  })
  status: string;

  @ApiProperty({
    description: 'Timestamp when the print job was created',
    example: '2024-01-01T12:00:00Z'
  })
  createdAt: string;

  static create(jobId: string, status: string = 'queued'): PrintResponseDto {
    const response = new PrintResponseDto();
    response.jobId = jobId;
    response.status = status;
    response.createdAt = new Date().toISOString();
    return response;
  }
}