import { Module } from '@nestjs/common';
import { FunctionsModule } from './functions/functions.module.js';
import { MetaModule } from './meta/meta.module.js';

@Module({
  imports: [FunctionsModule, MetaModule]
})
export class ControllersModule {}
