import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getDataType } from './utils/data-type.mapper.js';

export class BaseTables1720373216667 implements MigrationInterface {
  name = 'BaseTables1720373216667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const databaseType = queryRunner.connection.driver.options.type;

    // region Function
    await queryRunner.createTable(
      new Table({
        name: 'function',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__function',
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '512',
            isNullable: false,
            default: "''",
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
        indices: [{
          name: 'IDX__external_id',
          columnNames: ['external_id'],
        }]
      })
    );
    // endregion

    // region FunctionVersion
    await queryRunner.createTable(
      new Table({
        name: 'function_version',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk__function_version',
          },
          {
            name: 'function_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'code',
            type: 'text',
            isNullable: false,
            default: "''",
          },
          {
            name: 'publish_time',
            type: getDataType(databaseType, 'timestamp'),
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
        indices: [{
          name: 'UQ__function_version__function_id__is_active',
          columnNames: ['function_id', 'is_active'],
          isUnique: true,
          where: 'deletion_time IS NULL'
        }, {
          name: 'IDX__function_version__function_id__is_active',
          columnNames: ['function_id', 'is_active'],
        }, {
          name: 'IDX__function_version__external_id',
          columnNames: ['external_id'],
        }],
        foreignKeys: [{
          name: 'FK__function_version__function_id',
          columnNames: ['function_id'],
          referencedTableName: 'function',
          referencedColumnNames: ['id'],
        }],
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('function_version');
    await queryRunner.dropTable('function');
  }
}
