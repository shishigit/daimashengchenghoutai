import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {RequestMethod} from '@nestjs/common';
import {JianquanLeixing} from "../../config/zaxiang";

/**
 * 系统提供的接口
 */
@Entity({name: 'xt_jiekou'})
export class Jiekou extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    @Column({nullable: false, comment: '请求方法'})
    method: 'post' | 'get' | 'all';

    @Column({nullable: false, unique: true, comment: 'URL'})
    url: string;

    @Column({nullable: false, comment: '分组'})
    fenzu: string;

    @Column({nullable: false, comment: '说明'})
    shuoming: string;

    @Column({nullable: false, comment: '启用与否'})
    qiyong: boolean;

    @Column({nullable: false, comment: '鉴权类型'})
    jianquan: JianquanLeixing;

    constructor(
        url: string,
        method: RequestMethod,
        fenzu: string,
        shuoming: string,
        qiyong: boolean,
        jianquan: JianquanLeixing)
    {
        super();

        this.url = url;
        if (method === RequestMethod.POST) this.method = 'post';
        if (method === RequestMethod.GET) this.method = 'get';
        if (method === RequestMethod.ALL) this.method = 'all';
        this.fenzu = fenzu;
        this.shuoming = shuoming;
        this.qiyong = qiyong;
        this.jianquan = jianquan;
    }
}
