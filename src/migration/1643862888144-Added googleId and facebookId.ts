import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedGoogleIdAndFacebookId1643862888144 implements MigrationInterface {
    name = 'AddedGoogleIdAndFacebookId1643862888144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    }

}
