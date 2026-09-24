import { Module } from '@nestjs/common';
import { FunctionVersionModule } from '../../../repositories/function-version/function-version.module.js';
import { VersionsController } from './versions.controller.js';

@Module({
  controllers: [VersionsController],
  imports: [FunctionVersionModule],
})
export class VersionsModule {}
