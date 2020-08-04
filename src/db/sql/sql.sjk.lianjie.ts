import {SjkLianjie} from "../entities/sjk.lianjie";
import {Like} from "typeorm";

class SqlSjkLianjie
{
    findByMingcheng(mingcheng: string)
    {
        return SjkLianjie.find({where: {mingcheng: Like(`%${mingcheng}%`)}})
    }
}

export const sqlSjkLianjie = new SqlSjkLianjie()