import {XtYonghu} from "../entities/xt.yonghu";

class SqlXtYonghu
{
    findByZhanghao(zhanghao: string): Promise<XtYonghu>
    {
        return XtYonghu.findOne({where: {zhanghao}});
    }
}

export const sqlXtYonghu = new SqlXtYonghu();
