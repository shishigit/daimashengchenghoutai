import {HtXiangmu} from "../entities/ht.xiangmu";
import {Like} from "typeorm";

class SqlHtXiangmu
{
    findByMingcheng(mingcheng: string)
    {
        return HtXiangmu.find({
            where: {mingcheng: Like(`%${mingcheng}%`)},
            loadRelationIds: true
        });
    }

    deleteByID(id: number)
    {
        return HtXiangmu.delete({id});
    }
}

export const sqlHtXiangmu = new SqlHtXiangmu()