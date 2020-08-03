import {Module} from '@nestjs/common';
import {AppController} from './ctrl/app.controller';
import {AppService} from './serv/app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {peizhiwenjian} from "./config/peizhiwenjian";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule
{
}
