import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPhoneToAddress1643655062641 implements MigrationInterface {
    name = 'AddedPhoneToAddress1643655062641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "phone"`);
    }

}
