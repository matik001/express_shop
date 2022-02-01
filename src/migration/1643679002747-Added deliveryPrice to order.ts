import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedDeliveryPriceToOrder1643679002747 implements MigrationInterface {
    name = 'AddedDeliveryPriceToOrder1643679002747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "deliveryPrice" double precision NOT NULL DEFAULT '20'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deliveryPrice"`);
    }

}
