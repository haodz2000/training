import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class User1664264206172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            isUnique: true,
            type: 'varchar',
            length: '255',
          },
          {
            name: 'identify_card',
            isUnique: true,
            type: 'varchar',
            length: '12',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'birthday',
            type: 'date',
          },
          {
            name: 'gender',
            type: 'tinyInt',
            default: 0, // 0: Nam // 1: Nu, 2:other
          },
          {
            name: 'ward_id',
            type: 'int',
          },
          {
            name: 'type',
            type: 'int',
            default: 0, // 0: user, 1:admin
          },
          {
            name: 'token_reset_password',
            type: 'text',
            isNullable: true,
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
      'users',
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
    await queryRunner.dropTable('users');
  }
}
