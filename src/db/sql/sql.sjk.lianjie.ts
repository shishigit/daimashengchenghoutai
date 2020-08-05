import {SjkLianjie} from "../entities/sjk.lianjie";
import {Like} from "typeorm";

class SqlSjkLianjie
{
    findByMingcheng(mingcheng: string)
    {
        return SjkLianjie.find({where: {mingcheng: Like(`%${mingcheng}%`)}})
    }

    deleteByID(id: number)
    {
        return SjkLianjie.delete({id});
    }

    findByIds(ids: number[])
    {
        return SjkLianjie.findByIds(ids)
    }

    findAll()
    {
        return SjkLianjie.find();
    }
}

export const sqlSjkLianjie = new SqlSjkLianjie()