
const { app } =require("../src/server");
const supertest = require('supertest');
const mockRequest= supertest(app);

const { db }= require('../src/models/index.model');


beforeAll(async()=>{
    await db.sync();
});

describe("" , ()=>{
    test('response like 404 for invalid routes' , async()=>{
        const res= await mockRequest.get('/blaba');
        expect(res.status).toBe(404);
    });
    it('can add a person', async()=>{
        const response = await mockRequest.post('/customer').send({
            name:"samar",
        });
        expect(response.status).toBe(201);
    });


    test('can read all people' , async()=>{
        const response= await mockRequest.get('/customer');
        expect(response.status).toBe(200);

    });
    test('can update aperson' , async()=>{
        const response= await mockRequest.put('/customer/1');
        expect(response.status).toBe(201);

    });
    test('can delete one person' , async()=>{
        const res= await mockRequest.delete('/customer/1');
        expect(res.status).toBe(204);

    });


});
afterAll(async()=>{
    await db.drop();
});