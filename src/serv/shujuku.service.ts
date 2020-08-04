import {SjkLianjie} from "../db/entities/sjk.lianjie";
import {Connection, createConnection} from "typeorm";
import {YichangTishi} from "../config/xitongyichang";
import {QueryRunner} from "typeorm/query-runner/QueryRunner";
import {shujukuleixing_list} from "../config/zaxiang";

export class ShujukuService
{
    private lianjie: Connection
    private queryRunner: QueryRunner

    private constructor()
    {

    }

    static async instance(sjkLianjie: SjkLianjie)
    {
        if (!shujukuleixing_list.includes(sjkLianjie.type))
            throw new YichangTishi(`暂不支持 ${sjkLianjie.type} 的操作`)

        let ret = new ShujukuService()

        ret.lianjie = await createConnection({
            type: sjkLianjie.type,
            host: sjkLianjie.host,
            port: sjkLianjie.port,
            username: sjkLianjie.username,
            password: sjkLianjie.password,
            database: sjkLianjie.database
        })

        ret.queryRunner = ret.lianjie.createQueryRunner()

        return ret
    }

    async huoqu_tablename(): Promise<string[]>
    {


        let ls: { TABLE_NAME: string }[]

        if (['mysql', 'mariadb'].includes(this.lianjie.options.type))
        {
            ls = await this.lianjie.query(
                    `select distinct TABLE_NAME
                     from \`INFORMATION_SCHEMA\`.\`TABLES\`
                     WHERE TABLE_SCHEMA = ? `,
                [this.lianjie.options.database])

            return ls.map(value => value.TABLE_NAME)
        }

    }

    async huoqu_table(tablename: string[])
    {
        return this.queryRunner.getTables(tablename)
    }

    async close()
    {
        await this.queryRunner.release()
        await this.lianjie.close()
    }
}
