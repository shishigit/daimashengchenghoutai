import {YichangTishi} from "../config/xitongyichang";
import {rizhiService} from "./rizhi.service";
import {javaleixing} from "../config/shujujiegou";

class Shujuku2java
{
    datatype2javatype(datatype: string): javaleixing
    {
        switch (datatype)
        {
            case 'int':
                return 'Integer'
            case 'varchar':
                return 'String'
            default:
                rizhiService.error(`未知的数据库列类型：${datatype}`)
                throw new YichangTishi('服务器异常')
        }
    }
}

export const shujuku2java = new Shujuku2java()