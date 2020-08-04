import {MigrationInterface, QueryRunner} from 'typeorm';

// noinspection JSUnusedGlobalSymbols
export class qianyishuju1596442747636 implements MigrationInterface
{
    name = 'qianyishuju1596442747636';

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`
            insert into xt_yonghu(zhanghao, mima, jihuo)
                VALUE ('sandianyisiyiwu',
                       '$2b$10$fyTFjOiYcKAQvIJL5n/Cy.x25Fw2BeekCtdFKqWJxvtoWpDgPxvny',
                       1)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`
            delete
            from xt_yonghu
            where zhanghao = 'sandianyisiyiwu'
        `);
    }
}
