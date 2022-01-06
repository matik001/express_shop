import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDeletedToItem1641433249281 implements MigrationInterface {
    name = 'AddedDeletedToItem1641433249281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "deleted"`);
    }

}
