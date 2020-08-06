import {Response} from "express";

class XiazaiwenjianService
{
    xiazai(res: Response, wenjianming: string, wenjian: any)
    {
        res.attachment(encodeURI(wenjianming));
        res.end(wenjianming);
    }
}

export const xiazaiwenjianService = new XiazaiwenjianService()