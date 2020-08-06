import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {httpjiekou_zaxiang} from "../qianhoutongyong/http.jiekou";
import {shujukuleixing_list} from "../config/shujujiegou";

@JJYController('zaxiang', '杂项接口')
export class CtrlZaxiang
{
    @JJYPost('shujukuleixing', '获取数据库类型')
    shujukuleixing(
        @JJYBody() canshu: httpjiekou_zaxiang.shujukuleixing.Req,
    ): httpjiekou_zaxiang.shujukuleixing.Res
    {
        return [...shujukuleixing_list]
    }
}
