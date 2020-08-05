import {SjkLianjie} from "../db/entities/sjk.lianjie";
import {Connection, createConnection} from "typeorm";
import {YichangTishi} from "../config/xitongyichang";
import {QueryRunner} from "typeorm/query-runner/QueryRunner";
import {shujukuleixing_list} from "../config/zaxiang";

export class ShujukuService
{

    static async huoqu_table(sjkLianjie: SjkLianjie)
    {
        if (!shujukuleixing_list.includes(sjkLianjie.type))
            throw new YichangTishi(`暂不支持 ${sjkLianjie.type} 的操作`)

        return new ShujukuService(sjkLianjie).huoqu_table()
    }

    private lianjie: Connection
    private queryRunner: QueryRunner
    private sjkLianjie: SjkLianjie

    private constructor(sjkLianjie: SjkLianjie)
    {
        this.sjkLianjie = sjkLianjie
    }

    private async chuangjian_lianjie()
    {
        this.lianjie = await createConnection({
            type: this.sjkLianjie.type,
            host: this.sjkLianjie.host,
            port: this.sjkLianjie.port,
            username: this.sjkLianjie.username,
            password: this.sjkLianjie.password,
            database: this.sjkLianjie.database,
            name: Math.random().toString()
        })

        this.queryRunner = this.lianjie.createQueryRunner()
    }

    private async huoqu_tablename(): Promise<string[]>
    {
        let ls: { biaoming: string }[]

        if (['mysql', 'mariadb'].includes(this.lianjie.options.type))
        {
            ls = await this.lianjie.query(
                    `select distinct TABLE_NAME as biaoming
                     from \`INFORMATION_SCHEMA\`.\`TABLES\`
                     WHERE TABLE_SCHEMA = ? `,
                [this.lianjie.options.database])

            return ls.map(value => value.biaoming)
        }

    }

    private async huoqu_table()
    {
        await this.chuangjian_lianjie()
        let biaomings = await this.huoqu_tablename()
        let fanhui = await this.queryRunner.getTables(biaomings)
        await this.qingli_lianjie()

        return fanhui
    }

    private async qingli_lianjie()
    {
        await this.queryRunner.release()
        await this.lianjie.close()
    }
}
