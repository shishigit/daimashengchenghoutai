import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596442448379 implements MigrationInterface
{
    name = 'qianyishuju1596442448379'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `xt_jiekou` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `method` varchar(255) NOT NULL COMMENT '请求方法', `url` varchar(255) NOT NULL COMMENT 'URL', `fenzu` varchar(255) NOT NULL COMMENT '分组', `shuoming` varchar(255) NOT NULL COMMENT '说明', `qiyong` tinyint NOT NULL COMMENT '启用与否', `jianquan` varchar(255) NOT NULL COMMENT '鉴权类型', UNIQUE INDEX `IDX_fbce4580bb54cd8a8ea3eda523` (`url`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP INDEX `IDX_fbce4580bb54cd8a8ea3eda523` ON `xt_jiekou`");
        await queryRunner.query("DROP TABLE `xt_jiekou`");
    }
}
