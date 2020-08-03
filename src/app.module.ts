import {Module} from '@nestjs/common';
import {AppService} from './serv/app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {peizhiwenjian} from "./config/peizhiwenjian";
import {CtrlXitong} from "./ctrl/ctrl.xitong";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [CtrlXitong],
    providers: [AppService],
})
export class AppModule
{
}
