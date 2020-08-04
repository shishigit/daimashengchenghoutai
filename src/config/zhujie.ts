import {All, Body, Controller, Get, PipeTransform, Post, RequestMethod} from '@nestjs/common';
import {METHOD_METADATA, PATH_METADATA} from '@nestjs/common/constants';
import {Type} from '@nestjs/common/interfaces';
import {YichangXitongTuichu} from './xitongyichang';
import {XtJiekou} from "../db/entities/xt.jiekou";
import {sqlJiekou} from "../db/sql/sql.jiekou";
import {JianquanLeixing, urlQuanxian} from "./zaxiang";

const PATH_SHUOMING = 'PATH_SHUOMING';
const PATH_JIANQUAN = 'PATH_JIANQUAN';

/**
 * 系统当前包含的所有接口，不含已经废除的接口
 */
const suoyouJiekou: XtJiekou[] = [];

// noinspection JSUnusedGlobalSymbols
/**
 * 更新数据库中的接口记录
 */
export async function gengxinJiekou()
{
    await sqlJiekou.update({ qiyong: true }, { qiyong: false });

    for (const jiekou of suoyouJiekou)
    {
        if (await sqlJiekou.existByUrl(jiekou.url))
            await sqlJiekou.updateByUrl(jiekou);
        else
            await jiekou.save();

        urlQuanxian[jiekou.url] = jiekou.jianquan;

        await sqlJiekou.deleteFeiqi();
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Contrller注解
 * @param prefixOrOptions URL
 * @param fenzu 请求分组
 */
export function JJYController(prefixOrOptions: string, fenzu: string): ClassDecorator
{
    return function(target: object)
    {
        Object
            .getOwnPropertyNames((target as any).prototype)
            .map(value => (target as any).prototype[value])
            .filter(value => (value as any) instanceof Function)
            .filter(value => Reflect.hasMetadata(PATH_SHUOMING, value))
            .forEach(value =>
            {
                let url = `/${prefixOrOptions}/${Reflect.getMetadata(PATH_METADATA, value)}`;
                if (url.includes('//') || url.includes('_')) throw new YichangXitongTuichu(`错误的URL：${url}`);

                let jiekou = new XtJiekou(
                    url,
                    Reflect.getMetadata(METHOD_METADATA, value) as RequestMethod,
                    fenzu,
                    Reflect.getMetadata(PATH_SHUOMING, value),
                    true,
                    Reflect.getMetadata(PATH_JIANQUAN, value),
                );
                suoyouJiekou.push(jiekou);
            });

        Controller(prefixOrOptions)(target as any);
    };
}

// noinspection JSUnusedGlobalSymbols
export function JJYPost(path: string, path_shuoming: string, path_jianquan: JianquanLeixing = 'denglu'): MethodDecorator
{
    return function(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>)
    {
        Reflect.defineMetadata(PATH_SHUOMING, path_shuoming, descriptor.value);
        Reflect.defineMetadata(PATH_JIANQUAN, path_jianquan, descriptor.value);
        Post(path)(target, key, descriptor);
        return descriptor;
    };
}

// noinspection JSUnusedGlobalSymbols
export function JJYGet(path: string, path_shuoming: string, path_jianquan: JianquanLeixing = 'denglu'): MethodDecorator
{
    return function(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>)
    {
        Reflect.defineMetadata(PATH_SHUOMING, path_shuoming, descriptor.value);
        Reflect.defineMetadata(PATH_JIANQUAN, path_jianquan, descriptor.value);
        Get(path)(target, key, descriptor);
        return descriptor;
    };
}

// noinspection JSUnusedGlobalSymbols
export function JJYAll(path: string, path_shuoming: string, path_jianquan: JianquanLeixing): MethodDecorator
{
    return function(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>)
    {
        Reflect.defineMetadata(PATH_SHUOMING, path_shuoming, descriptor.value);
        Reflect.defineMetadata(PATH_JIANQUAN, path_jianquan, descriptor.value);
        All(path)(target, key, descriptor);
        return descriptor;
    };
}

// noinspection JSUnusedGlobalSymbols
export function JJYBody(property?: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator
{
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number)
    {
        Body(property, ...pipes)(target, propertyKey, parameterIndex);
    };
}
