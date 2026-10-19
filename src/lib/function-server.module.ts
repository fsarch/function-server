import { createServiceModule } from '@fsarch/server';
import { ModuleConfiguration } from '@fsarch/server/configuration';
import Joi from 'joi';
import { ExecutionEntity } from '../database/entities/execution.entity.js';
import { FunctionEntity } from '../database/entities/function.entity.js';
import { FunctionVersion } from '../database/entities/function-version.entity.js';
import { LogEntity } from '../database/entities/log.entity.js';
import { LogLevelEntity } from '../database/entities/log-level.entity.js';
import { ExecutionsController } from '../controllers/executions/executions.controller.js';
import { FunctionsController } from '../controllers/functions/functions.controller.js';
import { MetaController } from '../controllers/meta/meta.controller.js';
import { VersionsController } from '../controllers/functions/versions/versions.controller.js';
import { ExecutionService } from '../repositories/execution/execution.service.js';
import { FunctionService } from '../repositories/function/function.service.js';
import { FunctionVersionService } from '../repositories/function-version/function-version.service.js';

/**
 * The service's feature module, generated via `@fsarch/server`'s
 * `createServiceModule()` instead of the previous
 * `AppModule -> {ControllersModule -> {FunctionsModule, MetaModule,
 * ExecutionsModule}, RepositoriesModule -> {FunctionModule,
 * FunctionVersionModule, ExecutionModule}}` tree, each doing its own
 * unscoped `TypeOrmModule.forFeature(...)`. Flattened for the same reason
 * as `frontier-api`/`metric-server`: a single
 * `TypeOrmModule.forFeature(entities, connectionName)` call inside
 * `createServiceModule()` only covers providers/controllers declared
 * directly in the generated module.
 *
 * `MetaModule`'s `ModuleConfiguration.register('WORKER_CONFIG', ...)` keeps
 * its existing `name: 'worker'` config-section lookup, now threaded through
 * the generated module's `connectionName` as `serviceId` (same pattern as
 * `frontier-api`'s `WORKERS_CONFIG`), so a mono-service mount reads its own
 * `services[].config.worker` entry instead of the flat root `worker:`
 * section.
 *
 * The old root `AppModule`'s own `EventEmitterModule.forRoot()` is dropped
 * (not carried forward here) - no `@OnEvent`/`EventEmitter2` consumer exists
 * in this repo, and `@fsarch/server`'s `FsarchModule` already registers
 * `EventEmitterModule.forRoot()` globally once per process. A second
 * registration here is redundant at best - and, mounted alongside other
 * services via `FsArchAppBuilder.addService()`, a second `global: true`
 * dynamic-module registration of the same shared `EventEmitterModule` class
 * is exactly the pattern that was found (for `@nestjs/config`'s
 * `ConfigModule`, in `image-server`) to corrupt Nest's module-token
 * bookkeeping for every other concurrently mounted service's own
 * `AuthModule.register(id)` - see `@fsarch/server`'s mono-service harness
 * notes.
 *
 * `LogLevelEntity` has no own repository usage (no controller/service
 * directly injects it) but is kept in the entity list, matching the
 * existing `DATABASE_OPTIONS`.
 */
export const FunctionServerModule = createServiceModule({
  entities: [
    FunctionEntity,
    FunctionVersion,
    ExecutionEntity,
    LogEntity,
    LogLevelEntity,
  ],
  controllers: [
    FunctionsController,
    VersionsController,
    MetaController,
    ExecutionsController,
  ],
  providers: [FunctionService, FunctionVersionService, ExecutionService],
  imports: (serviceId) => [
    ModuleConfiguration.register('WORKER_CONFIG', {
      name: 'worker',
      serviceId,
      validationSchema: Joi.object({
        api: Joi.object()
          .pattern(
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
          )
          .required(),
      }).required(),
    }),
  ],
});
