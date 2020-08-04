import {SjkLianjie} from "../db/entities/sjk.lianjie";
import {Connection, createConnection} from "typeorm";
import {YichangTishi} from "../config/xitongyichang";

export class ShujukuService
{
    private lianjie: Connection

    private constructor()
    {

    }

    static async instance(sjkLianjie: SjkLianjie)
    {
        let ret = new ShujukuService()

        ret.lianjie = await createConnection({
            type: sjkLianjie.type,
            host: sjkLianjie.host,
            port: sjkLianjie.port,
            username: sjkLianjie.username,
            password: sjkLianjie.password,
            database: sjkLianjie.database
        })

        return ret
    }

    async huoqu_table()
    {
        switch (this.lianjie.options.type)
        {
            case "mysql":
            case "mariadb":
                return await this.lianjie.query(
                        `select distinct TABLE_NAME
                         from \`INFORMATION_SCHEMA\`.\`TABLES\`
                         WHERE TABLE_SCHEMA = ? `,
                    [this.lianjie.options.database])
            default:
                throw new YichangTishi(`暂不支持 ${this.lianjie.options.type} 的操作`)
        }
    }

    async close()
    {
        await this.lianjie.close()
    }
}
