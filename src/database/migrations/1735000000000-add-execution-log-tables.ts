import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class AddExecutionLogTables1735000000000 implements MigrationInterface {
  name = 'AddExecutionLogTables1735000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region Function - Add new columns
    await queryRunner.addColumn(
      'function',
      new TableColumn({
        name: 'enable_debug_logging',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
    await queryRunner.addColumn(
      'function',
      new TableColumn({
        name: 'enable_error_logging',
        type: 'boolean',
        isNullable: false,
        default: true,
      }),
    );
    await queryRunner.addColumn(
      'function',
      new TableColumn({
        name: 'retention_time_seconds',
        type: 'int',
        isNullable: false,
        default: 3600,
      }),
    );
    // endregion

    // region LogLevel
    await queryRunner.createTable(
      new Table({
        name: 'log_level',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__log_level',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '1024',
            isNullable: false,
          },
        ],
      })
    );

    // Insert log level values
    await queryRunner.manager.insert('log_level', [
      { id: 0, name: 'log' },
      { id: 1, name: 'trace' },
      { id: 2, name: 'debug' },
      { id: 3, name: 'info' },
      { id: 4, name: 'warn' },
      { id: 5, name: 'error' },
    ]);
    // endregion

    // region Execution
    await queryRunner.createTable(
      new Table({
        name: 'execution',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__execution',
          },
          {
            name: 'function_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'is_success',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'arguments',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'response',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletion_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: true,
          },
        ],
        indices: [
          {
            name: 'IDX__execution__function_id',
            columnNames: ['function_id'],
          },
          {
            name: 'IDX__execution__creation_time',
            columnNames: ['creation_time'],
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK__execution__function_id',
            columnNames: ['function_id'],
            referencedTableName: 'function',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      })
    );
    // endregion

    // region Log
    await queryRunner.createTable(
      new Table({
        name: 'log',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__log',
          },
          {
            name: 'execution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'log_level_id',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'data',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'creation_time',
            type: getDataType(databaseType, 'timestamp'),
            isNullable: false,
            default: 'now()',
          },
        ],
        indices: [
          {
            name: 'IDX__log__execution_id',
            columnNames: ['execution_id'],
          },
          {
            name: 'IDX__log__log_level_id',
            columnNames: ['log_level_id'],
          },
          {
            name: 'IDX__log__creation_time',
            columnNames: ['creation_time'],
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK__log__execution_id',
            columnNames: ['execution_id'],
            referencedTableName: 'execution',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FK__log__log_level_id',
            columnNames: ['log_level_id'],
            referencedTableName: 'log_level',
            referencedColumnNames: ['id'],
          }),
        ],
      })
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('function', 'retention_time_seconds');
    await queryRunner.dropColumn('function', 'enable_error_logging');
    await queryRunner.dropColumn('function', 'enable_debug_logging');
    await queryRunner.dropTable('log');
    await queryRunner.dropTable('execution');
    await queryRunner.dropTable('log_level');
  }
}
