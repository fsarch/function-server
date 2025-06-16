import { Module } from '@nestjs/common';
import { FunctionVersionService } from './function-version.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FunctionVersion } from "../../database/entities/function-version.entity.js";

@Module({
  providers: [FunctionVersionService],
  exports: [FunctionVersionService],
  imports: [
    TypeOrmModule.forFeature([
      FunctionVersion,
    ]),
  ],
})
export class FunctionVersionModule {}
