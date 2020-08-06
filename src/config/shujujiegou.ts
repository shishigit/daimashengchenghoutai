/**
 * 鉴权类型，匿名 | 登录 | 鉴权
 */
export type JianquanLeixing = 'niming' | 'denglu'

/**
 * 用于记录当前系统的URL的权限
 */
export const urlQuanxian: { [url: string]: JianquanLeixing } = {};

/**
 * Session 结构
 */
export interface JJYSession
{
    yonghu?: {  // 当前用户
        id: number,
        zhanghao: string
    }
}

/**
 * 当前系统支持的数据库类型
 */
export const shujukuleixing_list = ['mysql', 'mariadb'] as const
