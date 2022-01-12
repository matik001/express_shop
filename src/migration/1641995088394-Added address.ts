import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedAddress1641995088394 implements MigrationInterface {
    name = 'AddedAddress1641995088394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "ownerId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_73f9a47e41912876446d047d015" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_0674725fdabac6d1d748565cb51" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_0674725fdabac6d1d748565cb51"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "addressId"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
