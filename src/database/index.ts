import { FunctionEntity } from './entities/function.entity.js';
import { FunctionVersion } from './entities/function-version.entity.js';
import { BaseTables1720373216667 } from './migrations/1733690865449-base-tables.js';

export const DATABASE_OPTIONS = {
  entities: [FunctionEntity, FunctionVersion],
  migrations: [BaseTables1720373216667],
};

export { FunctionEntity, FunctionVersion };
