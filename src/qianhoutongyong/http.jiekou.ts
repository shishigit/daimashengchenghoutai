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
    export namespace table
    {
        export interface Req
        {
            shujukuid: number
        }

        export type Res = string[]
    }
    export namespace xialacaidan
    {
        export interface Req
        {
        }

        export interface Res
        {
            id: number;
            mingcheng: string
        }
    }
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

export namespace httpjiekou_hongtian
{
    export namespace shanchu
    {
        export interface Res
        {

        }

        export interface Req
        {
            id: number
        }
    }
    export namespace tianjia
    {
        export interface Res
        {

        }

        export interface Req
        {
            mingcheng: string;
            beizhu: string;
            shujukuid: number
        }
    }
    export namespace chaxun
    {
        export interface Req
        {
            mingcheng: string
        }

        export interface Res
        {
            id: number
            mingcheng: string
            beizhu: string
            shujukumingcheng: string
            shujukuid: number
        }
    }
}