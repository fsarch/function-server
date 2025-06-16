import { Module } from '@nestjs/common';
import { FunctionModule } from './function/function.module.js';
import { FunctionVersionModule } from './function-version/function-version.module.js';

@Module({

  imports: [FunctionModule, FunctionVersionModule]
})
export class RepositoriesModule {}
