import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionVersion } from '../../database/entities/function-version.entity.js';
import { FunctionVersionService } from './function-version.service.js';

@Module({
  providers: [FunctionVersionService],
  exports: [FunctionVersionService],
  imports: [TypeOrmModule.forFeature([FunctionVersion])],
})
export class FunctionVersionModule {}
