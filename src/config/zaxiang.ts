import {CallHandler, CanActivate, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {peizhiwenjian} from "./peizhiwenjian";
import {Observable} from "rxjs";
import {Request} from "express";
import {tap} from "rxjs/operators";
import * as session from 'express-session';
import * as memorystore from 'memorystore';
import * as bcrypt from 'bcrypt';
import {rizhiService} from "../serv/rizhi.service";

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
 * 数据结构
 *************************************************************************/

/**
 * 鉴权类型，匿名 | 登录 | 鉴权
 */
export type JianquanLeixing = 'niming' | 'denglu'

/**
 * 用于记录当前系统的URL的权限
 */
export const urlQuanxian: { [url: string]: JianquanLeixing } = {};

/**
 * Session 结构
 */
export interface JJYSession
{
    yonghu?: {  // 当前用户
        id: number,
        zhanghao: string
    }
}

/**
 * 当前系统支持的数据库类型
 */
export const shujukuleixing_list = ['mysql', 'mariadb'] as const

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


/*************************************************************************
 * 加密，解密
 *************************************************************************/

class Jiami
{
    /**
     * 比较字符串和HASH字符串
     * @param passwd 被比较的字符串
     * @param hash HASH字符串
     * @return true 如果符合，否则 false
     */
    fuhe(passwd: string, hash: string): boolean
    {
        return bcrypt.compareSync(passwd, hash);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * 加密字符串
     * @param passwd 被加密的字符串
     * @return 加密后的字符串
     */
    jiami(passwd: string)
    {
        return bcrypt.hashSync(passwd, 10);
    }
}

export const jiami = new Jiami();