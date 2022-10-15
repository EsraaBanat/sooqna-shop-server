'use strict';

process.env.SECRET = "TEST_SECRET";

const { db, users } = require('../src/models/index-model');
const { handleSignup, handleSignIn } = require('../src/router/auth-routes');

beforeAll(async () => {
    await db.sync();
    await users.create({ username: 'test', password: 'test' });
});
afterAll(async () => {
    await db.drop();
});

describe('Testing the AUTH Routes', () => {
    
    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    };
    const next = jest.fn();

    test('Can successfully signUp into Sooqna website ', async () => {

        let req = {
            body: {
                username: 'test1',
                password: 'test'
            }
        };

        await handleSignup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user: expect.any(Object),
                token: expect.any(String)
            })
            );
        });
        
        // test('Should call the error handler if no body attached to the request the on the request body', async () => {
        //     let req = {};
        //     jest.clearAllMocks();
    
        //     await handleSignup(req, res, next);
        //     expect(res.status).not.toHaveBeenCalled();
        //     expect(res.json).not.toHaveBeenCalled();
        //     expect(next).toHaveBeenCalledWith(expect.anything());
        // });

        test('Can successfully signIn into Sooqna website ', async () => {
            let req = {
                user: await users.findOne({ where: { username: 'test' } }),
            }

        await handleSignIn(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                user: expect.objectContaining({
                    username: expect.any(String),
                    password: expect.any(String),
                    token: expect.any(String),
                }),
                token: expect.any(String),
            })
        );
    });

    test('Should trigger error handler when no user is present on the request', async () => {
        let req = {};
        jest.clearAllMocks();

        await handleSignIn(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });



});