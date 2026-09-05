import { FunctionEntity } from './entities/function.entity.js';
import { FunctionVersion } from './entities/function-version.entity.js';
import { ExecutionEntity } from './entities/execution.entity.js';
import { LogEntity } from './entities/log.entity.js';
import { LogLevelEntity } from './entities/log-level.entity.js';
import { BaseTables1720373216667 } from './migrations/1733690865449-base-tables.js';
import { AddExecutionLogTables1735000000000 } from './migrations/1735000000000-add-execution-log-tables.js';
import { AddExecutionFunctionVersion1788600000000 } from './migrations/1788600000000-add-execution-function-version.js';

export const DATABASE_OPTIONS = {
  entities: [FunctionEntity, FunctionVersion, ExecutionEntity, LogEntity, LogLevelEntity],
  migrations: [BaseTables1720373216667, AddExecutionLogTables1735000000000, AddExecutionFunctionVersion1788600000000],
};

export { FunctionEntity, FunctionVersion, ExecutionEntity, LogEntity, LogLevelEntity };
