import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {peizhiwenjian} from "./config/peizhiwenjian";
import {httpJianquan, kaifaRizhi, memorysession} from "./config/zaxiang";
import {HttpYichang, ShujukuYichang, YichangXitongTuichu} from "./config/xitongyichang";
import {gengxinJiekou} from "./config/zhujie";
import {rizhiService} from "./serv/rizhi.service";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, {logger: rizhiService});

    if (peizhiwenjian.kaifa) app.useGlobalInterceptors(kaifaRizhi);

    app.useGlobalFilters(new HttpYichang(), new ShujukuYichang());
    if (!peizhiwenjian.kaifa) app.useGlobalGuards(httpJianquan);
    app.use(memorysession);

    await gengxinJiekou();

    await app.listen(peizhiwenjian.duankou);
}

bootstrap()
    .then(() => rizhiService.log('系统启动'))
    .catch(err =>
    {
        rizhiService.error('系统异常');
        rizhiService.error(err);
        if (err instanceof YichangXitongTuichu) process.exit();
    });