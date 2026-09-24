import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from '../../database/entities/function.entity.js';
import { FunctionService } from './function.service.js';

@Module({
  providers: [FunctionService],
  exports: [FunctionService],
  imports: [TypeOrmModule.forFeature([FunctionEntity])],
})
export class FunctionModule {}
