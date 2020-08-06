import {Response} from "express";

class XiazaiwenjianService
{
    xiazai(res: Response, wenjianming: string, wenjian: any)
    {
        res.attachment(encodeURI(wenjianming));
        res.end(wenjian);
    }
}

export const xiazaiwenjianService = new XiazaiwenjianService()