import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596592303724 implements MigrationInterface
{
    name = 'qianyishuju1596592303724'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `ht_xiangmu` ADD `shujukuId` int NULL COMMENT 'ID'");
        await queryRunner.query("ALTER TABLE `ht_xiangmu` ADD CONSTRAINT `FK_9c1917a7bd874a37c59988e5334` FOREIGN KEY (`shujukuId`) REFERENCES `sjk_lianjie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `ht_xiangmu` DROP FOREIGN KEY `FK_9c1917a7bd874a37c59988e5334`");
        await queryRunner.query("ALTER TABLE `ht_xiangmu` DROP COLUMN `shujukuId`");
    }

}
