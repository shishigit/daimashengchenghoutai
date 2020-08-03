import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'yonghu'})
export class Yonghu extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({unique: true, nullable: false, comment: '帐号'})
    zhanghao: string;

    @Column({nullable: false, comment: '密码'})
    mima: string;

    @Column({default: true, nullable: false, comment: '激活'})
    jihuo: boolean;
}