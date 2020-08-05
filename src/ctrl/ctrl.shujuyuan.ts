import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_shujuyuan} from "../qianhoutongyong/http.jiekou";
import {sqlSjkLianjie} from "../db/sql/sql.sjk.lianjie";
import {SjkLianjie} from "../db/entities/sjk.lianjie";
import {YichangTishi} from "../config/xitongyichang";
import {shujukuleixing_list} from "../config/zaxiang";
import {ShujukuService} from "../serv/shujuku.service";

@JJYController('shujuyuan', '数据源接口')
export class CtrlShujuyuan
{

    @JJYPost('shanchu', '删除')
    async shanchu(
        @JJYBody() canshu: httpjiekou_shujuyuan.shanchu.Req,
    ): Promise<httpjiekou_shujuyuan.shanchu.Res>
    {
        return sqlSjkLianjie.deleteByID(canshu.id)
    }

    @JJYPost('xialacaidan', '获取下拉菜单列表')
    async xialacaidan(
        @JJYBody() canshu: httpjiekou_shujuyuan.xialacaidan.Req,
    ): Promise<httpjiekou_shujuyuan.xialacaidan.Res[]>
    {
        return sqlSjkLianjie.findAll()
    }

    @JJYPost('table', '查询数据库表')
    async table(
        @JJYBody() canshu: httpjiekou_shujuyuan.table.Req,
    ): Promise<httpjiekou_shujuyuan.table.Res>
    {
        let lianjie = await sqlSjkLianjie.findById(canshu.shujukuid)
        let kubiaos = await ShujukuService.huoqu_table(lianjie)
        return kubiaos.map(value => value.name)
    }

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
        if (!shujukuleixing_list.map(value => value as string).includes(canshu.type))
            throw new YichangTishi(`暂不支持 ${canshu.type} 的操作`)

        let lianjie = new SjkLianjie()
        Object.assign(lianjie, canshu)
        await lianjie.save()
        return {}
    }
}
