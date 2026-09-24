import { Module } from '@nestjs/common';
import { FunctionModule } from '../../repositories/function/function.module.js';
import { FunctionsController } from './functions.controller.js';
import { VersionsModule } from './versions/versions.module.js';

@Module({
  controllers: [FunctionsController],
  imports: [FunctionModule, VersionsModule],
})
export class FunctionsModule {}
