import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('User Controller', () => {

    it('有效用户id示例：id:12 username:A', async () => {
        const app = await createApp<Framework>();
        const response = await createHttpRequest(app).get('/api/user/12');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username');
        expect(response.body.username).toBe('A');
        await close(app);
    });

    it('无效用户id', async () => {
        const app = await createApp<Framework>();
        const response = await createHttpRequest(app).get('/api/user/-1');
        expect(response.status).toBe(404);
        await close(app);
    });
});