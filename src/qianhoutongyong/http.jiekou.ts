export namespace httpjiekou_xitong
{
    export namespace denglu
    {
        export interface Req
        {
            zhanghao: string
            mima: string
        }

        export interface Res
        {

        }
    }

    export namespace jingtaiwenjian
    {
        export interface Req
        {
            wenjianming: string
        }
    }

    export namespace tuichu
    {

        export interface Req
        {
        }

        export interface Res
        {
        }
    }
}

export namespace httpjiekou_shujuyuan
{
    export namespace chaxun
    {
        export interface Req
        {
            mingcheng: string
        }

        export interface Res
        {
            id: number;
            mingcheng: string
            type: string
            host: string
            port: number
            username: string
            password: string
            database: string
        }
    }

    export namespace tianjia
    {
        export interface Req
        {
            mingcheng: string
            type: string
            host: string
            port: number
            username: string
            password: string
            database: string
        }

        export interface Res
        {
        }
    }
    export namespace shanchu
    {
        export interface Req
        {
            id: number
        }

        export interface Res
        {

        }
    }
}

export namespace httpjiekou_zaxiang
{
    export namespace shujukuleixing
    {
        export interface Req
        {

        }

        export type Res = string[]
    }
}