import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {Res, Session} from '@nestjs/common';
import {YichangTishi} from '../config/xitongyichang';
import {Response} from 'express';
import {peizhiwenjian} from '../config/peizhiwenjian';
import {httpjiekou_xitong} from "../qianhoutongyong/http.jiekou";
import {XtYonghu} from "../db/entities/xt.yonghu";
import {sqlXtYonghu} from "../db/sql/sql.xt.yonghu";
import {rizhiService} from "../serv/rizhi.service";
import {JJYSession} from "../config/shujujiegou";
import {jiamiService} from "../serv/jiami.service";

@JJYController('xitong', '系统接口')
export class CtrlXitong
{
    @JJYPost('denglu', '系统登陆', 'niming')
    async denglu(
        @JJYBody() body: httpjiekou_xitong.denglu.Req,
        @Session() session: JJYSession,
    ): Promise<httpjiekou_xitong.denglu.Res>
    {
        if (!body.zhanghao) throw  new YichangTishi('账号不能为空');
        if (!body.mima) throw  new YichangTishi('密码不能为空');
        let yonghu: XtYonghu = await sqlXtYonghu.findByZhanghao(body.zhanghao);
        if (!yonghu || !yonghu.jihuo) throw new YichangTishi('账号或者密码错误！');
        let fuhe = jiamiService.fuhe(body.mima, yonghu.mima);
        if (!fuhe) throw new YichangTishi('账号或者密码错误！');

        session.yonghu = {id: yonghu.id, zhanghao: yonghu.zhanghao};

        return {};
    }

    @JJYPost('tuichu', '系统推出', 'niming')
    async tuichu(
        @JJYBody() body: httpjiekou_xitong.tuichu.Req,
        @Session() session: JJYSession,
    ): Promise<httpjiekou_xitong.tuichu.Res>
    {
        (session as Express.Session).destroy(err =>
        {
            if (!err) return
            rizhiService.error(`销毁 Session 异常：${JSON.stringify(session.yonghu)}`)
            rizhiService.error(err)
        })
        return {};
    }

    @JJYPost('jingtaiwenjian', '下载静态文件')
    jingtaiwenjian(
        @JJYBody() canshu: httpjiekou_xitong.jingtaiwenjian.Req,
        @Res() res: Response,
    )
    {
        res.attachment(encodeURI(canshu.wenjianming));
        res.sendFile(`${peizhiwenjian.jingtairoot}/${canshu.wenjianming}`);
    }
}
