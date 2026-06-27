import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionService } from './execution.service.js';
import { ExecutionEntity } from '../../database/entities/execution.entity.js';
import { LogEntity } from '../../database/entities/log.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionEntity, LogEntity])],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule {}
