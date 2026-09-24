import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionEntity } from '../../database/entities/execution.entity.js';
import { LogEntity } from '../../database/entities/log.entity.js';
import { ExecutionService } from './execution.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionEntity, LogEntity])],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule {}
