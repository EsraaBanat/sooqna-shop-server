'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
describe('API Server', () => {
    test('getting data from home route / >>>  home route is working', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('SOOQNA E-COMMERCE');
    });
    test('getting data from /product route', async () => {
        const response = await request.get('/product');
        // expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
    });
    it('404 on a bad route', async () => {
        const response = await request.get('/abc');
        expect(response.status).toBe(404);
    });

    it('404 on a bad method', async () => {
        const response = await request.put('/product');
        expect(response.status).toBe(404);
    });
    it('handle not found request', async () => {
        const response = await request.get('/abc');
        expect(response.status).toEqual(404);
        // expect(response.status).toBe(404);
    });
});