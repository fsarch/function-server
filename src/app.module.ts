import { Module } from '@nestjs/common';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ControllersModule } from './controllers/controllers.module.js';
import { RepositoriesModule } from './repositories/repositories.module.js';
import { BaseTables1720373216667 } from "./database/migrations/1733690865449-base-tables.js";
import { FunctionVersion } from "./database/entities/function-version.entity.js";
import { FunctionEntity } from "./database/entities/function.entity.js";

@Module({
  imports: [
    FsarchModule.register({
      auth: {},
      database: {
        entities: [
          FunctionEntity,
          FunctionVersion,
        ],
        migrations: [
          BaseTables1720373216667,
        ],
      },
    }),
    EventEmitterModule.forRoot(),
    ControllersModule,
    RepositoriesModule,
  ],
})
export class AppModule {}
