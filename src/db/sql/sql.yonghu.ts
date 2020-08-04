import {XtYonghu} from "../entities/xt.yonghu";

class SqlYonghu
{
    findByZhanghao(zhanghao: string): Promise<XtYonghu>
    {
        return XtYonghu.findOne({where: {zhanghao}});
    }
}

export const sqlYonghu = new SqlYonghu();
