import { Module } from '@nestjs/common';
import { ExecutionsModule } from './executions/executions.module.js';
import { FunctionsModule } from './functions/functions.module.js';
import { MetaModule } from './meta/meta.module.js';

@Module({
  imports: [FunctionsModule, MetaModule, ExecutionsModule],
})
export class ControllersModule {}
