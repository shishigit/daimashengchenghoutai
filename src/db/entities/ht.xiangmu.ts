import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'ht_xiangmu'})
export class HtXiangmu extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '名称'})
    mingcheng: string

    @Column({comment: '备注'})
    beizhu: string
}