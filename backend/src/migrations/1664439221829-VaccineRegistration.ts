import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class VaccineRegistration1664439221829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccine_registrations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'group_id',
            type: 'int',
          },
          {
            name: 'site_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'vaccine_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '15',
            isUnique: true,
          },
          {
            name: 'insurrance_card',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'job',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'work_place',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'time',
            type: 'date',
          },
          {
            name: 'shift',
            type: 'tinyInt',
            default: 2, //0: morning, 1: afternoon, 2: both
          },
          {
            name: 'status',
            type: 'tinyInt',
            default: 1, //0: failed, 1: success, 2: completed
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
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['site_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sites',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'vaccine_registrations',
      new TableForeignKey({
        columnNames: ['vaccine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaccines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccine_registrations');
  }
}
