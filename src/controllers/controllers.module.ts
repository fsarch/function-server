import { Module } from '@nestjs/common';
import { FunctionsModule } from './functions/functions.module.js';
import { MetaModule } from './meta/meta.module.js';
import { PrinterModule } from './printer/printer.module.js';

@Module({
  imports: [FunctionsModule, MetaModule, PrinterModule]
})
export class ControllersModule {}
