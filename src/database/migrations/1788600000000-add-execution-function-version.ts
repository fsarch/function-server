import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddExecutionFunctionVersion1788600000000 implements MigrationInterface {
  name = 'AddExecutionFunctionVersion1788600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'execution',
      new TableColumn({
        name: 'function_version_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'execution',
      new TableForeignKey({
        name: 'FK__execution__function_version_id',
        columnNames: ['function_version_id'],
        referencedTableName: 'function_version',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createIndex(
      'execution',
      new TableIndex({
        name: 'IDX__execution__function_version_id',
        columnNames: ['function_version_id'],
      }),
    );

    // region FunctionVersion - Add name/description
    await queryRunner.addColumn(
      'function_version',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '512',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'function_version',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );
    // endregion
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('function_version', 'description');
    await queryRunner.dropColumn('function_version', 'name');
    await queryRunner.dropIndex('execution', 'IDX__execution__function_version_id');
    await queryRunner.dropForeignKey('execution', 'FK__execution__function_version_id');
    await queryRunner.dropColumn('execution', 'function_version_id');
  }
}
