import { Module } from '@nestjs/common';
import { FunctionModule } from './function/function.module.js';
import { FunctionVersionModule } from './function-version/function-version.module.js';
import { ExecutionModule } from './execution/execution.module.js';

@Module({

  imports: [FunctionModule, FunctionVersionModule, ExecutionModule]
})
export class RepositoriesModule {}
