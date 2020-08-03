import { FindConditions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {Jiekou} from "../entities/jiekou";

class SqlJiekou
{
    async existByUrl(url: string | Jiekou): Promise<boolean>
    {
        if (url instanceof Jiekou) url = url.url;
        let ls = await Jiekou.findOne({ where: { url: url } });
        return !!ls;
    }

    updateByUrl(jiekou: Jiekou)
    {
        return this.update({ url: jiekou.url }, jiekou);
    }

    deleteFeiqi()
    {
        return Jiekou.delete({ qiyong: false });
    }

    update(find: FindConditions<Jiekou>, update: QueryDeepPartialEntity<Jiekou>)
    {
        return Jiekou.update<Jiekou>(find, update);
    }
}

export const sqlJiekou = new SqlJiekou();
