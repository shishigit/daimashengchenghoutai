import {Module} from '@nestjs/common';
import {AppService} from './serv/app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {peizhiwenjian} from "./config/peizhiwenjian";
import {CtrlXitong} from "./ctrl/ctrl.xitong";
import {CtrlShujuyuan} from "./ctrl/ctrl.shujuyuan";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [CtrlXitong, CtrlShujuyuan],
    providers: [AppService],
})
export class AppModule
{
}
