import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('User Controller', () => {

    it('查找特定id的zone', async () => {
        const a = await createApp<Framework>();
        const response = await createHttpRequest(a).get('/api/zone/3');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('created_at');
        expect(response.body).toHaveProperty('creator');
        expect(response.body).toHaveProperty('contents_count');
        expect(response.body).toHaveProperty('category');
        expect(response.body).toHaveProperty('introduction');
        await close(a);
    });
});