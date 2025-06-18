import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller.js';
import { ModuleConfiguration } from "../../fsarch/configuration/module/module-configuration.module.js";
import Joi from "joi";

@Module({
  controllers: [MetaController],
  imports: [
    ModuleConfiguration.register('WORKER_CONFIG', {
      validationSchema: Joi.object({
        api: Joi.object().pattern(
          Joi.string(),
          Joi.alternatives(
            Joi.object({
              type: 'pdf-server',
              url: Joi.string().required(),
            }),
          ),
        ).required(),
      }).required(),
      name: 'worker',
    }),
  ],
})
export class MetaModule {}
