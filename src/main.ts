import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {peizhiwenjian} from "./config/peizhiwenjian";
import {httpJianquan, kaifaRizhi, xitongRizhi} from "./config/zaxiang";
import {HttpYichang, ShujukuYichang, YichangXitongTuichu} from "./config/xitongyichang";
import {gengxinJiekou} from "./config/zhujie";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, {logger: xitongRizhi});

    if (peizhiwenjian.kaifa) app.useGlobalInterceptors(kaifaRizhi);

    app.useGlobalFilters(new HttpYichang(), new ShujukuYichang());
    app.useGlobalGuards(httpJianquan);
    app.use(memorysession);

    await gengxinJiekou();

    await app.listen(peizhiwenjian.duankou);
}

bootstrap()
    .then(() => xitongRizhi.log('系统启动'))
    .catch(err =>
    {
        xitongRizhi.error('系统异常');
        xitongRizhi.error(err);
        if (err instanceof YichangXitongTuichu) process.exit();
    });