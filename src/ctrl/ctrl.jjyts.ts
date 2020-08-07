import {JJYBody, JJYController, JJYPost, JJYRes} from '../config/zhujie';
import {httpjiekou_jjyts} from "../qianhoutongyong/http.jiekou";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";
import {YichangTishi} from "../config/xitongyichang";
import {sqlTsXiangmu} from "../db/sql/sql.ts.xiangmu";
import {TsXiangmu} from "../db/entities/ts.xiangmu";
import {ShujukuService} from "../serv/shujuku.service";
import {hongtianMoban, jjytsMoban} from "../serv/moban.service";
import {xiazaiwenjianService} from "../serv/xiazaiwenjian.service";
import {Response} from "express";

@JJYController('jjyts', '宏天项目接口')
export class CtrlJjyts
{
    @JJYPost('shengchengdaima', '生成代码')
    async shengchengdaima(
        @JJYBody() canshu: httpjiekou_jjyts.shengchengdaima.req,
        @JJYRes() res: Response,
    )
    {
        if (!canshu.baoming)
            throw new YichangTishi('没有指定包名')

        if (!canshu.shujukuid)
            throw new YichangTishi('没有指定数据库')

        let lianjie = await sqlSjkLianjie.findById(canshu.shujukuid)
        if (!lianjie)
            throw new YichangTishi('没有找到数据库')

        let kubiao_list = await ShujukuService.huoqu_table(lianjie)
        let kubiao = kubiao_list.filter(value => value.name === canshu.kubiao).pop()
        if (!kubiao)
            throw new YichangTishi('没有找到数据表')

        // TODO 这里需要修改模板
        let wenjian = await hongtianMoban.shengcheng(kubiao, canshu)
        xiazaiwenjianService.xiazai(res, 'JJYTS.zip', wenjian)
    }

    @JJYPost('chuangjiankubiao', '创建库表')
    async chuangjiankubiao(
        @JJYBody() canshu: httpjiekou_jjyts.chuangjiankubiao.req,
        @JJYRes() res: Response,
    )
    {
        if (!canshu.biaoming)
            throw new YichangTishi('没有指定表名！')

        if (canshu.shuxings.filter(value => value.zhujian).length > 1)
            throw new YichangTishi('多个主键！')

        let wenjian = await jjytsMoban.shengchengkubiao(canshu)
        xiazaiwenjianService.xiazai(res, 'JJYTS.zip', wenjian)
    }

    @JJYPost('shanchu', '删除项目')
    async shanchu(
        @JJYBody() canshu: httpjiekou_jjyts.shanchu.Req,
    ): Promise<httpjiekou_jjyts.shanchu.Res>
    {
        return sqlTsXiangmu.deleteByID(canshu.id)
    }

    @JJYPost('chaxun', '查询项目')
    async chaxun(
        @JJYBody() canshu: httpjiekou_jjyts.chaxun.Req,
    ): Promise<httpjiekou_jjyts.chaxun.Res[]>
    {
        let tsXiangmus = await sqlTsXiangmu.findByMingcheng(canshu.mingcheng)
        let shujukus = await sqlSjkLianjie.findByIds(tsXiangmus.map(value => value.shujuku as any))
        return tsXiangmus.map(value =>
        {
            let shujuku = shujukus.filter(value1 => value1.id === value.shujuku as any).pop()
            return {
                id: value.id,
                mingcheng: value.mingcheng,
                beizhu: value.beizhu,
                shujukumingcheng: shujuku.mingcheng,
                shujukuid: shujuku.id
            }
        })
    }

    @JJYPost('tianjia', '添加项目')
    async tianjia(
        @JJYBody() canshu: httpjiekou_jjyts.tianjia.Req,
    ): Promise<httpjiekou_jjyts.tianjia.Res>
    {
        if (!canshu.shujukuid || canshu.shujukuid < 0)
            throw new YichangTishi(`数据库不能为空`)

        let shujuku = await sqlSjkLianjie.findByIds([canshu.shujukuid])
        if (shujuku.length === 0)
            throw new YichangTishi(`数据库不存在`)


        let tsXiangmu = new TsXiangmu()
        tsXiangmu.shujuku = shujuku.pop()
        tsXiangmu.beizhu = canshu.beizhu
        tsXiangmu.mingcheng = canshu.mingcheng
        await tsXiangmu.save()

        return {}
    }
}
