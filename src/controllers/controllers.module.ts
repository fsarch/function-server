import { Module } from '@nestjs/common';
import { FunctionsModule } from './functions/functions.module.js';
import { MetaModule } from './meta/meta.module.js';
import { ExecutionsModule } from './executions/executions.module.js';

@Module({
  imports: [FunctionsModule, MetaModule, ExecutionsModule]
})
export class ControllersModule {}
