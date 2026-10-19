import { DATABASE_OPTIONS } from '../database/index.js';
import { FunctionServerModule } from './function-server.module.js';

export { FunctionServerModule };
export const entities = DATABASE_OPTIONS.entities;
export const migrations = DATABASE_OPTIONS.migrations;

/**
 * The frozen equivalent of this service's standalone `main.ts` builder
 * calls, as data - see `@fsarch/server`'s `ServiceMountDescriptor`. A
 * mono-service harness spreads this into `.addService({ id, ...descriptor })`;
 * the standalone `main.ts` keeps calling the builder methods directly (no
 * behavior change), just sourcing its values from here instead of
 * duplicating them.
 */
export const descriptor = {
  module: FunctionServerModule,
  entities,
  migrations,
  swagger: {
    title: 'Function-Server',
    description: 'The Function-Server API description',
    version: '1.0',
  },
  auth: true,
};
