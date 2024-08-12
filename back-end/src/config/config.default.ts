import { MidwayConfig } from '@midwayjs/core';
import { Userinfo } from '../entity/userinfo.entity';
import { Zones } from '../entity/zones.entity';
import { Posts } from '../entity/posts.entity';
import { Comments } from '../entity/comments.entity';

export default {
  // use for cookie sign key, should change to your own and keep security

  keys: '1721982368770_3882',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: 'localhost',          // 数据库主机
        port: 5432,                 // 数据库端口
        username: 'testuser', // 数据库用户名
        password: '050522', // 数据库密码
        database: 'interestzone',   // 数据库名称
        synchronize: false,          // 自动同步实体到数据库
        logging: false,             // 禁用查询日志
        entities: [Userinfo, Zones, Posts, Comments],
      },
    },
  },
  bodyParser: {
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '50mb', // Set request body size limit to 5MB
    formLimit: '50mb', // Set form data size limit to 5MB
    textLimit: '50mb', // Set text data size limit to 5MB
  },
} as MidwayConfig;