import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnNameTableSite1664875606949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE sites ADD name VARCHAR(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('sites', 'name');
  }
}
