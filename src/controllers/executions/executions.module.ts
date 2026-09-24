import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '../../database/entities/log.entity.js';
import { ExecutionModule } from '../../repositories/execution/execution.module.js';
import { ExecutionsController } from './executions.controller.js';

@Module({
  imports: [ExecutionModule, TypeOrmModule.forFeature([LogEntity])],
  controllers: [ExecutionsController],
})
export class ExecutionsModule {}
