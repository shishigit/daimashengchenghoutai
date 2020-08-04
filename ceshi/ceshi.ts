import {ShujukuService} from "../src/serv/shujuku.service";
import {SjkLianjie} from "../src/db/entities/sjk.lianjie";


async function ceshi()
{

    let lianjie = new SjkLianjie()

    lianjie.type = "mysql"
    lianjie.mingcheng = 'ceshi'
    lianjie.database = 'ceshi'
    lianjie.password = 'shishi'
    lianjie.username = 'root'
    lianjie.port = 3306
    lianjie.host = 'localhost'

    let service = await ShujukuService.instance(lianjie)
    let table = await service.huoqu_table()
    console.log(table)
    await service.close()
}

ceshi().catch(reason =>
{
    console.log(reason)
})