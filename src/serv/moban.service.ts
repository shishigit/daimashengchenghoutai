import * as fs from 'fs'
import {peizhiwenjian} from "../config/peizhiwenjian";
import {Table} from "typeorm";
import {httpjiekou_hongtian} from "../qianhoutongyong/http.jiekou";
import * as JSZip from "jszip";
import {javaleixing} from "../config/shujujiegou";
import {shujuku2java} from "./shujuku2java";

const ejs = require('ejs')
const pascalcase = require('pascalcase');

interface shiti_java
{
    mingcheng: string
    baoming: string
    zhujian?: {
        mingcheng: string,
        miaoshu: string,
        leixing: javaleixing,
        pashikamingcheng: string
    },
    shuxing_list: {
        mingcheng: string,
        miaoshu: string,
        leixing: javaleixing,
        pashikamingcheng: string
    }[]
}

class HongtianMoban
{
    private _Test_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/Test.java.txt').toString()
    private _TestController_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestController.java.txt').toString()
    private _TestDao_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestDao.java.txt').toString()
    private _TestManager_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManager.java.txt').toString()
    private _TestManager_vue_ = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManager.vue.txt').toString()
    private _TestManagerImpl_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManagerImpl.java.txt').toString()
    private _TestMapper_xml_ = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestMapper.xml.txt').toString()

    shengcheng(kubiao: Table, canshu: httpjiekou_hongtian.shengchengdaima.req)
    {
        let zip = new JSZip();

        let zhujian = kubiao.columns.filter(value => value.isPrimary).pop()
        let shuxings = kubiao.columns.filter(value => !value.isPrimary)

        let shiti: shiti_java = {
            mingcheng: pascalcase(kubiao.name),
            baoming: canshu.baoming,
            zhujian: zhujian ? {
                miaoshu: zhujian.comment,
                mingcheng: zhujian.name,
                pashikamingcheng: pascalcase(zhujian.name),
                leixing: shujuku2java.datatype2javatype(zhujian.type)
            } : undefined,
            shuxing_list: shuxings.map(value =>
            {
                return {
                    mingcheng: value.name,
                    leixing: shujuku2java.datatype2javatype(value.type),
                    miaoshu: value.comment,
                    pashikamingcheng: pascalcase(value.name)
                }
            })
        }

        let entity = ejs.render(this._Test_java, shiti)
        zip.file(pascalcase(shiti.mingcheng) + '.java', entity)

        let controller = ejs.render(this._TestController_java, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'Controller.java', controller)

        let dao = ejs.render(this._TestDao_java, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'Dao.java', dao)

        let managerjava = ejs.render(this._TestManager_java, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'Manager.java', managerjava)

        let managervue = ejs.render(this._TestManager_vue_, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'Manager.vue', managervue)

        let managerimpl = ejs.render(this._TestManagerImpl_java, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'ManagerImpl.java', managerimpl)

        let mapper = ejs.render(this._TestMapper_xml_, shiti)
        zip.file(pascalcase(shiti.mingcheng) + 'Mapper.xml', mapper)

        return zip.generateAsync({type: 'nodebuffer'})
    }
}

export const hongtianMoban = new HongtianMoban()