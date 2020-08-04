import {SjkLianjie} from "../db/entities/sjk.lianjie";
import {Connection, createConnection} from "typeorm";

export class ShujukuService
{
    private connection: Connection

    private constructor()
    {

    }

    static async instance(sjkLianjie: SjkLianjie)
    {
        let ret = new ShujukuService()

        ret.connection = await createConnection({
            type: sjkLianjie.type,
            host: sjkLianjie.host,
            port: sjkLianjie.port,
            username: sjkLianjie.username,
            password: sjkLianjie.password,
            database: sjkLianjie.database
        })

        return ret
    }

    huoqu_table()
    {

    }
}
