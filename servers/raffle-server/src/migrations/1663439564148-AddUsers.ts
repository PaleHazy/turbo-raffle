import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsers1663439564148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "users_entity" RENAME COLUMN "email" TO "lemail"`,
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "users_entity" RENAME COLUMN "lemail" TO "email"`,
    )
    }

}
