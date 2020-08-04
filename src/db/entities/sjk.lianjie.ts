import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export type shujukuleixing = 'mysql' | 'mariadb'

@Entity({name: 'sjk_lianjie'})
export class SjkLianjie
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '记录标识'})
    mingcheng: string

    @Column({nullable: false, comment: '数据库类型'})
    type: shujukuleixing

    @Column({nullable: false, comment: 'IP地址'})
    host: string

    @Column({nullable: false, comment: '端口'})
    port: number

    @Column({nullable: false, comment: '帐号'})
    username: string

    @Column({nullable: false, comment: '密码'})
    password: string

    @Column({nullable: false, comment: '数据库名称'})
    database: string
}