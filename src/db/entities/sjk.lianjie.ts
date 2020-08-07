import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {HtXiangmu} from "./ht.xiangmu";
import {shujukuleixing_list} from "../../config/shujujiegou";
import {TsXiangmu} from "./ts.xiangmu";

type shujukuleixing_type = (typeof shujukuleixing_list)[number]

@Entity({name: 'sjk_lianjie'})
export class SjkLianjie extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '记录标识'})
    mingcheng: string

    @Column({nullable: false, comment: '数据库类型'})
    type: shujukuleixing_type

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

    @OneToMany(() => HtXiangmu, htXiangmu => htXiangmu.shujuku)
    htXiangmu: HtXiangmu[]

    @OneToMany(() => TsXiangmu, tsXiangmu => tsXiangmu.shujuku)
    tsXiangmu: TsXiangmu[]
}