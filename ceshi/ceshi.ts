import {createConnection} from "typeorm";
import {MysqlQueryRunner} from "typeorm/driver/mysql/MysqlQueryRunner";

async function ceshi()
{

    let lianjie = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "shishi",
        // database: "ceshi",
    })

    let runner = lianjie.createQueryRunner() as MysqlQueryRunner

    // runner.getta

    let shujukus=await runner.getDatabases()

    console.log('444444444444444')
}

ceshi().catch(reason => console.log(reason))