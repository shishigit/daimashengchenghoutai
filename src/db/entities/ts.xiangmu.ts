import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SjkLianjie} from "./sjk.lianjie";

@Entity({name: 'ts_xiangmu'})
export class TsXiangmu extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '名称'})
    mingcheng: string

    @Column({comment: '备注'})
    beizhu: string

    @ManyToOne(() => SjkLianjie, sjy => sjy.tsXiangmu)
    shujuku: SjkLianjie
}