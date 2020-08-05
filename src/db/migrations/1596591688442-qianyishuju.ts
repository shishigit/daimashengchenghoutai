import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596591688442 implements MigrationInterface
{
    name = 'qianyishuju1596591688442'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `ht_xiangmu` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `mingcheng` varchar(255) NOT NULL COMMENT '名称', `beizhu` varchar(255) NOT NULL COMMENT '备注', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP TABLE `ht_xiangmu`");
    }

}
