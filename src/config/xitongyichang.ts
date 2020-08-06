import {ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';
import {QueryFailedError} from 'typeorm';
import {rizhiService} from "../serv/rizhi.service";

/**
 * HTTP 异常处理器
 */
@Catch(HttpException)
export class HttpYichang implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof ForbiddenException)
        {
            response.status(600).json('暂无权限');
            return;
        }

        if (exception instanceof YichangTishi)
        {
            response.status(600).json(exception.getResponse());
            return;
        }

        rizhiService.error(`HTTP异常  URL：${request.originalUrl}  BODY：${JSON.stringify(request.body)}`);
        rizhiService.error(exception);

        response.status(600).json('系统异常！');
    }
}

/**
 *  数据库 异常处理器
 */
@Catch(QueryFailedError)
export class ShujukuYichang implements ExceptionFilter
{
    catch(exception: QueryFailedError, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        rizhiService.error(`SQL异常  URL：${request.originalUrl}  BODY：${JSON.stringify(request.body)}`);
        rizhiService.error(exception);

        response.status(600).json('系统异常！');
    }
}

/**
 * 提示异常，抛出此异常后，系统将返回给前端
 */
export class YichangTishi extends HttpException
{
    constructor(private readonly xinxi: string)
    {
        super(xinxi, 600);
    }
}

/**
 * 系统退出异常，抛出此异常后，系统将退出运行
 */
export class YichangXitongTuichu extends Error
{
    constructor(message: string)
    {
        super(message);
    }
}
