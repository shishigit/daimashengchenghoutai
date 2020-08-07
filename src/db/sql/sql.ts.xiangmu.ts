import {Like} from "typeorm";
import {TsXiangmu} from "../entities/ts.xiangmu";

class SqlTsXiangmu
{
    findByMingcheng(mingcheng: string)
    {
        return TsXiangmu.find({
            where: {mingcheng: Like(`%${mingcheng}%`)},
            loadRelationIds: true
        });
    }

    deleteByID(id: number)
    {
        return TsXiangmu.delete({id});
    }
}

export const sqlTsXiangmu = new SqlTsXiangmu()