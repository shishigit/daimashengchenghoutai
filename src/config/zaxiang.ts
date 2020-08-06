import {CallHandler, CanActivate, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {peizhiwenjian} from "./peizhiwenjian";
import {Observable} from "rxjs";
import {Request} from "express";
import {tap} from "rxjs/operators";
import * as session from 'express-session';
import * as memorystore from 'memorystore';
import {rizhiService} from "../serv/rizhi.service";
import {JJYSession, urlQuanxian} from "./shujujiegou";

/*************************************************************************
 * 开发时候，打印请求
 *************************************************************************/

class KaifaRizhi implements NestInterceptor
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>
    {
        if (context.getType() === 'http')
        {
            let req = context.switchToHttp().getRequest<Request>();

            rizhiService.verbose(`请求
URL： ${req.originalUrl}
METHOD: ${req.method}
BODY：
${JSON.stringify(req.body, null, 4)}`);

            return next
                .handle()
                .pipe(
                    tap(() =>
                        {
                        },
                        (e) =>
                        {
                            rizhiService.error(e);
                        }),
                );
        }

        rizhiService.verbose(`未处理的日志： ${context.getType()}`);
        return next.handle();
    }

}

export const kaifaRizhi = new KaifaRizhi();

/*************************************************************************
 * HTTP 鉴权
 *************************************************************************/

class HttpJianquan implements CanActivate
{
    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        if (peizhiwenjian.kaifa) return true

        if (context.getType() !== 'http') return false;

        const request = context.switchToHttp().getRequest();

        let qingqiuyrl = request.originalUrl.split('?')[0];
        let quanxian = urlQuanxian[qingqiuyrl];

        if (quanxian === 'niming') return true;

        if (quanxian === 'denglu')
        {
            let session = request.session as JJYSession;
            return !!session.yonghu;
        }

        return false;
    }
}

export const httpJianquan = new HttpJianquan();

/*************************************************************************
 * Http Session
 *************************************************************************/

const SessionStore = memorystore(session);
const sessionStore = new SessionStore({checkPeriod: peizhiwenjian.session.maxAge});

export const memorysession = session({
    cookie: {
        maxAge: peizhiwenjian.session.maxAge,
    },
    rolling: true,
    saveUninitialized: true,
    resave: false,
    secret: 'jjy?123?',
    store: sessionStore,
});