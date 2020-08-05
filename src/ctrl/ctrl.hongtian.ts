import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_hongtian} from "../qianhoutongyong/http.jiekou";
import {sqlHtXiangmu} from "../db/sql/sql.ht.xiangmu";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";
import {YichangTishi} from "../config/xitongyichang";
import {HtXiangmu} from "../db/entities/ht.xiangmu";

@JJYController('hongtian', '宏天项目接口')
export class CtrlHongtian
{

    // @JJYPost('shanchu', '删除')
    // async shanchu(
    //     @JJYBody() canshu: httpjiekou_shujuyuan.shanchu.Req,
    // ): Promise<httpjiekou_shujuyuan.shanchu.Res>
    // {
    //     return sqlSjkLianjie.deleteByID(canshu.id)
    // }

    @JJYPost('chaxun', '查询')
    async chaxun(
        @JJYBody() canshu: httpjiekou_hongtian.chaxun.Req,
    ): Promise<httpjiekou_hongtian.chaxun.Res[]>
    {
        let htXiangmus = await sqlHtXiangmu.findByMingcheng(canshu.mingcheng)
        let shujukus = await sqlSjkLianjie.findByIds(htXiangmus.map(value => value.shujuku as any))
        return htXiangmus.map(value =>
        {
            return {
                id: value.id,
                mingcheng: value.mingcheng,
                beizhu: value.beizhu,
                shujukumingcheng: shujukus.filter(value1 => value1.id === value.shujuku as any).pop().mingcheng
            }
        })
    }

    @JJYPost('tianjia', '添加')
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
