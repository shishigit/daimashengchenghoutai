import {JJYBody, JJYController, JJYPost} from '../config/zhujie';
import {Res, Session} from '@nestjs/common';
import {YichangTishi} from '../config/xitongyichang';
import {Response} from 'express';
import {peizhiwenjian} from '../config/peizhiwenjian';
import {httpjiekou_xitong} from "../qianhoutongyong/http.jiekou";
import {jiami, JJYSession} from "../config/zaxiang";
import {Yonghu} from "../db/entities/yonghu";
import {sqlYonghu} from "../db/sql/sql.yonghu";

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
        let yonghu: Yonghu = await sqlYonghu.findByZhanghao(body.zhanghao);
        if (!yonghu || !yonghu.jihuo) throw new YichangTishi('账号或者密码错误！');
        let fuhe = jiami.fuhe(body.mima, yonghu.mima);
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
        session.yonghu = undefined;
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
