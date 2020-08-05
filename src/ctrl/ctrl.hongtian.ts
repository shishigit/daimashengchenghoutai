import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_hongtian} from "../qianhoutongyong/http.jiekou";
import {sqlHtXiangmu} from "../db/sql/sql.ht.xiangmu";

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
        let xiangmu = await sqlHtXiangmu.findByMingcheng(canshu.mingcheng)
// let shujuku=sqlSjkLianjie.findByIds(xi)
        return []
    }

    // @JJYPost('tianjia', '添加')
    // async tianjia(
    //     @JJYBody() canshu: httpjiekou_shujuyuan.tianjia.Req,
    // ): Promise<httpjiekou_shujuyuan.tianjia.Res>
    // {
    //     if (!shujukuleixing_list.map(value => value as string).includes(canshu.type))
    //         throw new YichangTishi(`暂不支持 ${canshu.type} 的操作`)
    //
    //     let lianjie = new SjkLianjie()
    //     Object.assign(lianjie, canshu)
    //     await lianjie.save()
    //     return {}
    // }
}
