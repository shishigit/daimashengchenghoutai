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
    private _Test_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/Test.java.ejs').toString()
    private _TestController_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestController.java').toString()
    private _TestDao_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestDao.java').toString()
    private _TestManager_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManager.java').toString()
    private _TestManager_vue_ = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManager.vue_').toString()
    private _TestManagerImpl_java = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestManagerImpl.java').toString()
    private _TestMapper_xml_ = fs.readFileSync(peizhiwenjian.jingtairoot + '/hongtianmoban/TestMapper.xml_').toString()

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

        return zip.generateAsync({type: 'nodebuffer'})
    }
}

export const hongtianMoban = new HongtianMoban()