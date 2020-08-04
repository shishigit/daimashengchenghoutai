import {FindConditions} from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {XtJiekou} from "../entities/xt.jiekou";

class SqlJiekou
{
    async existByUrl(url: string | XtJiekou): Promise<boolean>
    {
        if (url instanceof XtJiekou) url = url.url;
        let ls = await XtJiekou.findOne({where: {url: url}});
        return !!ls;
    }

    updateByUrl(jiekou: XtJiekou)
    {
        return this.update({url: jiekou.url}, jiekou);
    }

    deleteFeiqi()
    {
        return XtJiekou.delete({qiyong: false});
    }

    update(find: FindConditions<XtJiekou>, update: QueryDeepPartialEntity<XtJiekou>)
    {
        return XtJiekou.update<XtJiekou>(find, update);
    }
}

export const sqlJiekou = new SqlJiekou();
