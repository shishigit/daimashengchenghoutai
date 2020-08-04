import {MigrationInterface, QueryRunner} from "typeorm";

export class qianyishuju1596510307856 implements MigrationInterface
{
    name = 'qianyishuju1596510307856'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("CREATE TABLE `sjk_lianjie` (`id` int NOT NULL AUTO_INCREMENT COMMENT 'ID', `mingcheng` varchar(255) NOT NULL COMMENT '记录标识', `type` varchar(255) NOT NULL COMMENT '数据库类型', `host` varchar(255) NOT NULL COMMENT 'IP地址', `port` int NOT NULL COMMENT '端口', `username` varchar(255) NOT NULL COMMENT '帐号', `password` varchar(255) NOT NULL COMMENT '密码', `database` varchar(255) NOT NULL COMMENT '数据库名称', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query("DROP TABLE `sjk_lianjie`");
    }

}
