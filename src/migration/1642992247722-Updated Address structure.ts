import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedAddressStructure1642992247722 implements MigrationInterface {
    name = 'UpdatedAddressStructure1642992247722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "street2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street2"`);
    }

}
