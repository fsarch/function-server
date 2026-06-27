import { Module } from '@nestjs/common';
import { ExecutionsController } from './executions.controller.js';
import { ExecutionModule } from '../../repositories/execution/execution.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '../../database/entities/log.entity.js';

@Module({
  imports: [ExecutionModule, TypeOrmModule.forFeature([LogEntity])],
  controllers: [ExecutionsController],
})
export class ExecutionsModule {}
