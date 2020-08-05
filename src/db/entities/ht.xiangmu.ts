import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SjkLianjie} from "./sjk.lianjie";

@Entity({name: 'ht_xiangmu'})
export class HtXiangmu extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '名称'})
    mingcheng: string

    @Column({comment: '备注'})
    beizhu: string

    @ManyToOne(() => SjkLianjie, sjy => sjy.htXiangmu)
    shujuku: SjkLianjie
}