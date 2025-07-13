import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller.js';
import { PrinterService } from '../../repositories/printer/printer.service.js';

@Module({
  controllers: [PrinterController],
  providers: [PrinterService],
  exports: [PrinterService],
})
export class PrinterModule {}