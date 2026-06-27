import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller.js';
import { ModuleConfiguration } from '@fsarch/server/configuration';
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
            Joi.object({
              type: 'material-tracing-server',
              url: Joi.string().required(),
            }),
            Joi.object({
              type: 'product-server',
              url: Joi.string().required(),
              catalogId: Joi.string().required(),
            }),
            Joi.object({
              type: 'printer-server',
              url: Joi.string().required(),
            }),
            Joi.object({
              type: 'metric-server',
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
