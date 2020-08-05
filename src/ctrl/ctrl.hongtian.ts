import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_shujuyuan} from "../qianhoutongyong/http.jiekou";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";

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
        @JJYBody() canshu: hongti.chaxun.Req,
    ): Promise<httpjiekou_shujuyuan.chaxun.Res[]>
    {
        return sqlSjkLianjie.findByMingcheng(canshu.mingcheng)
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
