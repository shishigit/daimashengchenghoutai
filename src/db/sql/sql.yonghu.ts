import {Yonghu} from "../entities/yonghu";

class SqlYonghu
{
    findByZhanghao(zhanghao: string): Promise<Yonghu>
    {
        return Yonghu.findOne({where: {zhanghao}});
    }
}

export const sqlYonghu = new SqlYonghu();
