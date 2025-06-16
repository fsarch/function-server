import { Module } from '@nestjs/common';
import { FunctionsModule } from './functions/functions.module.js';

@Module({
  imports: [FunctionsModule]
})
export class ControllersModule {}
