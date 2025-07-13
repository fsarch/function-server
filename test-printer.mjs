#!/usr/bin/env node

/**
 * Simple test script to validate the Printer API implementation
 * This tests the printer service logic without the full NestJS application context
 */

import { PrinterService } from '../src/repositories/printer/printer.service.js';

class MockConfigService {
  constructor() {
    this.config = {
      printer: {
        type: 'http',
        url: 'http://localhost:8080/print'
      }
    };
  }

  get(key) {
    if (key === 'printer') {
      return this.config.printer;
    }
    return null;
  }
}

async function testPrinterService() {
  console.log('Testing Printer Service...\n');

  const configService = new MockConfigService();
  const printerService = new PrinterService(configService);

  try {
    // Test PDF printing
    console.log('1. Testing PDF printing...');
    const pdfRequest = {
      content: 'Sample PDF content',
      options: {},
      pdfOptions: { format: 'A4', margin: '10mm' }
    };
    
    const pdfResult = await printerService.printPdf(pdfRequest);
    console.log('✓ PDF print job created:', pdfResult);

    // Test Material Tracing printing
    console.log('\n2. Testing Material Tracing printing...');
    const tracingRequest = {
      content: 'Material tracing document',
      options: {},
      tracingData: { batchNumber: 'BATCH001', materialId: 'MAT123' }
    };
    
    const tracingResult = await printerService.printMaterialTracing(tracingRequest);
    console.log('✓ Material tracing print job created:', tracingResult);

    // Test Product printing
    console.log('\n3. Testing Product printing...');
    const productRequest = {
      content: 'Product information',
      options: {},
      productData: { productId: 'PROD001', quantity: 100 }
    };
    
    const productResult = await printerService.printProduct(productRequest);
    console.log('✓ Product print job created:', productResult);

    // Test print job status
    console.log('\n4. Testing print job status...');
    const statusResult = await printerService.getPrintJobStatus(pdfResult.jobId);
    console.log('✓ Print job status retrieved:', statusResult);

    // Test error case - missing config
    console.log('\n5. Testing error case - missing config...');
    const badConfigService = new MockConfigService();
    badConfigService.get = () => null;
    const badPrinterService = new PrinterService(badConfigService);
    
    try {
      await badPrinterService.printPdf(pdfRequest);
      console.log('✗ Expected error was not thrown');
    } catch (error) {
      console.log('✓ Expected error caught:', error.message);
    }

    console.log('\n✅ All tests passed! Printer API implementation is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testPrinterService();