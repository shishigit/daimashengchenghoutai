import {Module} from '@nestjs/common';
import {AppService} from './serv/app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {peizhiwenjian} from "./config/peizhiwenjian";
import {CtrlXitong} from "./ctrl/ctrl.xitong";
import {CtrlShujuyuan} from "./ctrl/ctrl.shujuyuan";
import {CtrlZaxiang} from "./ctrl/ctrl.zaxiang";
import {CtrlHongtian} from "./ctrl/ctrl.hongtian";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [CtrlXitong, CtrlShujuyuan, CtrlZaxiang, CtrlHongtian],
    providers: [AppService],
})
export class AppModule
{
}
