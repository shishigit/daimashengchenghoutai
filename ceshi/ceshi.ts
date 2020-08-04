import {ShujukuService} from "../src/serv/shujuku.service";
import {SjkLianjie} from "../src/db/entities/sjk.lianjie";

async function ceshi()
{

    let lianjie = new SjkLianjie()

    lianjie.type = "mysql"
    lianjie.mingcheng = 'ceshi'
    lianjie.database = 'daimashengcheng'
    lianjie.password = 'shishi'
    lianjie.username = 'root'
    lianjie.port = 3306
    lianjie.host = 'localhost'

    let service = await ShujukuService.huoqu_table(lianjie)

    console.log(service)
}

ceshi().catch(reason =>
{
    console.log(reason)
})