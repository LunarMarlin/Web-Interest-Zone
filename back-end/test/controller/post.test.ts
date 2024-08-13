import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('User Controller', () => {

    it('查找post', async () => {
        const app = await createApp<Framework>();
        const response = await createHttpRequest(app).get('/api/post/9');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('creator');
        expect(response.body).toHaveProperty('created_at');
        await close(app);
    });

});