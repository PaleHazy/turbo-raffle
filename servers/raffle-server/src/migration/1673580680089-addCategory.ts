import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCategory1673581633564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //add new category row
    await queryRunner.query("INSERT INTO category_entity (name) VALUES ('Default')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM category_entity WHERE name = 'Default'");
  }
}
