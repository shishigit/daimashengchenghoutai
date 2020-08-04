import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_shujuyuan} from "../qianhoutongyong/http.jiekou";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";
import {SjkLianjie} from "../db/entities/sjk.lianjie";

@JJYController('shujuyuan', '数据源接口')
export class CtrlShujuyuan
{

    @JJYPost('chaxun', '查询')
    async chaxun(
        @JJYBody() canshu: httpjiekou_shujuyuan.chaxun.Req,
    ): Promise<httpjiekou_shujuyuan.chaxun.Res[]>
    {
        return sqlSjkLianjie.findByMingcheng(canshu.mingcheng)
    }

    @JJYPost('tianjia', '添加')
    async tianjia(
        @JJYBody() canshu: httpjiekou_shujuyuan.tianjia.Req,
    ): Promise<httpjiekou_shujuyuan.tianjia.Res>
    {
        let lianjie = new SjkLianjie()
        Object.assign(lianjie, canshu)
        await lianjie.save()
        return {}
    }
}
