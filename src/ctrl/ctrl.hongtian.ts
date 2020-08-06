import {JJYBody, JJYController, JJYPost, JJYRes} from '../config/zhujie';
import {httpjiekou_hongtian} from "../qianhoutongyong/http.jiekou";
import {sqlHtXiangmu} from "../db/sql/sql.ht.xiangmu";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";
import {YichangTishi} from "../config/xitongyichang";
import {HtXiangmu} from "../db/entities/ht.xiangmu";
import {Response} from "express";
import {xiazaiwenjianService} from "../serv/xiazaiwenjian.service";
import {ShujukuService} from "../serv/shujuku.service";
import {hongtianMoban} from "../serv/moban.service";

@JJYController('hongtian', '宏天项目接口')
export class CtrlHongtian
{

    @JJYPost('shengchengdaima', '生成代码')
    async shengchengdaima(
        @JJYBody() canshu: httpjiekou_hongtian.shengchengdaima.req,
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

        let wenjian = await hongtianMoban.shengcheng(kubiao, canshu)

        xiazaiwenjianService.xiazai(res, '配料数据.zip', wenjian)
    }

    @JJYPost('shanchu', '删除项目')
    async shanchu(
        @JJYBody() canshu: httpjiekou_hongtian.shanchu.Req,
    ): Promise<httpjiekou_hongtian.shanchu.Res>
    {
        return sqlHtXiangmu.deleteByID(canshu.id)
    }

    @JJYPost('chaxun', '查询项目')
    async chaxun(
        @JJYBody() canshu: httpjiekou_hongtian.chaxun.Req,
    ): Promise<httpjiekou_hongtian.chaxun.Res[]>
    {
        let htXiangmus = await sqlHtXiangmu.findByMingcheng(canshu.mingcheng)
        let shujukus = await sqlSjkLianjie.findByIds(htXiangmus.map(value => value.shujuku as any))
        return htXiangmus.map(value =>
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
        @JJYBody() canshu: httpjiekou_hongtian.tianjia.Req,
    ): Promise<httpjiekou_hongtian.tianjia.Res>
    {
        if (!canshu.shujukuid || canshu.shujukuid < 0)
            throw new YichangTishi(`数据库不能为空`)

        let shujuku = await sqlSjkLianjie.findByIds([canshu.shujukuid])
        if (shujuku.length === 0)
            throw new YichangTishi(`数据库不存在`)


        let htXiangmu = new HtXiangmu()
        htXiangmu.shujuku = shujuku.pop()
        htXiangmu.beizhu = canshu.beizhu
        htXiangmu.mingcheng = canshu.mingcheng
        await htXiangmu.save()

        return {}
    }
}
