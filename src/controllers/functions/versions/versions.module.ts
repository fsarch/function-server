import { Module } from '@nestjs/common';
import { VersionsController } from "./versions.controller.js";
import { FunctionVersionModule } from "../../../repositories/function-version/function-version.module.js";

@Module({
  controllers: [VersionsController],
  imports: [FunctionVersionModule],
})
export class VersionsModule {}
