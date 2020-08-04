import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596442747626 implements MigrationInterface
{
    name = 'qianyishuju1596442747626'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `xt_yonghu` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `zhanghao` varchar(255) NOT NULL COMMENT '帐号', `mima` varchar(255) NOT NULL COMMENT '密码', `jihuo` tinyint NOT NULL COMMENT '激活' DEFAULT 1, UNIQUE INDEX `IDX_0f88154b5f237413835e3c9142` (`zhanghao`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP INDEX `IDX_0f88154b5f237413835e3c9142` ON `xt_yonghu`");
        await queryRunner.query("DROP TABLE `xt_yonghu`");
    }

}
