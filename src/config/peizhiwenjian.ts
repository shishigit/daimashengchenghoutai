import {TypeOrmModuleOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import {resolve} from 'path';

/**
 * 配置文件：整个系统的配置，用于配置开发环境和生产环境
 */
interface Peizhiwenjian
{
    kaifa: boolean, // 开发环境？生产环境？
    duankou: number // 监听端口
    shujuku: TypeOrmModuleOptions // 数据库
    session: { // Session 数据结构
        maxAge: number;
    };
    jingtairoot: string
}

// 开发环境
const kaifahuanjing: Peizhiwenjian = {
    jingtairoot: resolve(`${__dirname}/../../../jingtaiwenjian`),
    session: {maxAge: 2 * 60 * 60 * 1000},
    duankou: 3100,
    kaifa: true,
    shujuku: {
        logging: 'all',
        logger: 'advanced-console',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'shishi',
        database: 'daimashengcheng',
        entities: [resolve(__dirname + '/../db/entities/*.js')],
        migrations: [resolve(__dirname + '/../db/migrations/*.js')],
        migrationsRun: true,
        migrationsTransactionMode: 'all',
    },
};

export const peizhiwenjian: Peizhiwenjian = kaifahuanjing;

