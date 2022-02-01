import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedReceivedOrdersForSeller1643687500489 implements MigrationInterface {
    name = 'AddedReceivedOrdersForSeller1643687500489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_36eff870cbb426cbaa8f79de886"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "sellerId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8a583acc24e13bcf84b1b9d0d20" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8a583acc24e13bcf84b1b9d0d20"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "sellerId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_36eff870cbb426cbaa8f79de886" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
