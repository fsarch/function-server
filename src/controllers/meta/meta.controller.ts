import { Controller, Get, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ModuleConfigurationService } from "../../fsarch/configuration/module/module-configuration.service.js";
import { WorkerConfigType } from "./meta.type.js";

@ApiTags('.meta')
@Controller({
  path: '.meta',
  version: '1',
})
@ApiBearerAuth()
export class MetaController {
  constructor(
    @Inject('WORKER_CONFIG')
    private readonly workerConfigService: ModuleConfigurationService<WorkerConfigType>,

  ) {
  }

  @Get('worker')
  public async GetUiMeta() {
    const config = this.workerConfigService.get();

    const entries = Object.entries(config.api).map(([key, value]) => {
      return [key, value];
    });

    return {
      api: Object.fromEntries(entries),
    };
  }
}
