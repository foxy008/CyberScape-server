const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')
const { User } = require('../models/user')
const { signToken } = require('../helpers/jwt')

// let validToken;
// const invalidToken = '123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

// const userTest = {
//     email: 'user@mail.com',
//     password: '12345'
// }

// afterAll(async function () {
    
// })
const createdToken = signToken({id: 1})

beforeAll(async function() {
    // User 
    // .create(userTest)
    // .then((res) => {
    //     validToken = token({
    //         id : res.id,
    //         email: res.email
    //     })
    // })
    await insertMockData()
    console.log('ini jalan');

    // await cleanup()
})





describe("User Routes Users Test", () => {
    describe('POST /users/register - create new user', ()=>{
        it('should create register and response 201', async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'user@mail.com',
                password : '12345'
            }
            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expect.any(Object))    
        })
        it("should email empty and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: null,
                password: '12345',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Email is required")
        })

        it("should password empty and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'user@mail.com',
                password: null,
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            console.log(response , "ini response");
            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Password is required")
        })

        it("should email empty string and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: '',
                password: '123123',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Email is required")
        })

        it("should password empty string and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'user@mail.com',
                password: '',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Password is required")
        })

        it("should email already and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'user@mail.com',
                password: '12345',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Email already used")
        })

        it("should Invalid email format and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'user',
                password: '123123',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Invalid email format")
        })
    })

    describe('POST /login - user login', ()=>{
        it("should login user and response 200", async() => {
            const user = {
                email: 'user@mail.com',
                password : '12345'
            }

            const response = await request(app)
            .post('/users/login')
            .send(user)

            expect(response.status).toBe(200)
            expect(typeof response.body).toBe('object')
        })

        it("should wrong password and response 401", async() => {
            const user = {
                email: 'user@mail.com',
                password : '123'
            }

            const response = await request(app)
            .post('/users/login')
            .send(user)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe("Wrong email/password")
        })

        it("should email empty in database and response 401", async() => {
            const user = {
                email: 'hello@mail.com',
                password : '12345'
            }

            const response = await request(app)
            .post('/users/login')
            .send(user)

            expect(response.status).toBe(401)
            expect(response.body.message).toBe("Wrong email/password")
        })
    })

    describe('GET /users - get profile', () => {
        it('should get profile and response 200', async () => {
            const response = await request(app)
            .get("/users")
            .set({access_token: createdToken})

            expect(response.status).toBe(200)
        })

        it("should failed get profile because without login and response 401", async function () {
            const res = await request(app)
            .get('/users')
    
            
            expect(res.status).toBe(403)
            expect(res.body.message).toBe("Wrong access token")
        })
    
        it("should failed get profile because token is not valid and response 401", async function () {
            const res = await request(app)
            .get('/users')
            .set({access_token:"123"})
    
    
            expect(res.status).toBe(403)
            expect(res.body.message).toBe("Wrong access token")
    
        })
    })
})