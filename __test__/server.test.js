
const { app } =require("../src/server");
const supertest = require('supertest');
const mockRequest= supertest(app);

const { db }= require('../src/models/index.model');
const { Test } = require("supertest");

beforeAll(async()=>{
    await db.sync();
});

describe("" , ()=>{
    test('response like 404 for invalid routes' , async()=>{
        const res= await mockRequest.get('/blaba');
        expect(res.status).toBe(404);
    })
    test('can read all people' , async()=>{
        const res= await mockRequest.get('/people');
        expect(res.status).toBe(200);

    })
    test('can read one person' , async()=>{
        const res= await mockRequest.get('/people/1');
        expect(res.status).toBe(200);

    })
    test('can delete one person' , async()=>{
        const res= await mockRequest.delete('/people/1');
        expect(res.status).toBe(204);

    })


});
afterAll(async()=>{
    await db.drop();
})