import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Site1664435131182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sites',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ward_id',
            type: 'int',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'leader',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'table',
            type: 'int',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'sites',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wards',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sites');
  }
}
