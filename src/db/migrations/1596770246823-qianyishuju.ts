import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596770246823 implements MigrationInterface
{
    name = 'qianyishuju1596770246823'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `ts_xiangmu` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `mingcheng` varchar(255) NOT NULL COMMENT '名称', `beizhu` varchar(255) NOT NULL COMMENT '备注', `shujukuId` int NULL COMMENT 'ID', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ts_xiangmu` ADD CONSTRAINT `FK_76069bcbb4f68614fad36987ff4` FOREIGN KEY (`shujukuId`) REFERENCES `sjk_lianjie`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("ALTER TABLE `ts_xiangmu` DROP FOREIGN KEY `FK_76069bcbb4f68614fad36987ff4`");
        await queryRunner.query("DROP TABLE `ts_xiangmu`");
    }

}
