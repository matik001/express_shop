import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedZipCode1642992359674 implements MigrationInterface {
    name = 'AddedZipCode1642992359674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "zipCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipCode"`);
    }

}
