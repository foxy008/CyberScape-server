const request = require('supertest')
const app = require('../app')
// const insertUserData = require('../lib/insertUserData')
const { signToken } = require('../helpers/jwt')
const { User} = require('../models');
const { hashPass } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const createdToken = signToken({id: 3})
const nullQuota = signToken({id: 2})

const trueVerifyToken = signToken({
    email : 'ghandurathallah10@gmail.com',
    id : 3
})

const falseVerifyToken = signToken({
    email : 'user@users.com',
    id :2
})

// jest.setTimeout(90 * 1000)

beforeAll(async function() {
    await queryInterface.bulkDelete('Users',null, {
        truncate:true, restartIdentity:true, cascade:true
    })
    await User.bulkCreate([
        {
            firstName: "admin",
            lastName: "admin",
            email: "admin@admin.com",
            password: hashPass("12345678"),
            quota: 500
        },
        {
            firstName: "user",
            lastName: "user",
            email: "user@users.com",
            password: hashPass("12345678"),
            quota: 0,
            isVerified: true
        },
    ])
})

describe("User Routes Users Test", () => {
    describe('POST /users/register - create new user', ()=>{
        it('should create register and response 201', async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'ghandurathallah10@gmail.com',
                password : '12345678',
                isVerified: true
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

        it("should firstname empty and response 400", async() => {
            const user = {
                firstName : null,
                lastName : 'user',
                email: 'user@mail.com',
                password: '12345',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Firstname is required")
        })

        it("should lastname empty and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : null,
                email: 'user@mail.com',
                password: '12345678',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            console.log(response , "ini response");
            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Lastname is required")
        })

        it("should firstname empty string and response 400", async() => {
            const user = {
                firstName : '',
                lastName : 'user',
                email: 'user@mail.com',
                password: '12345678',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Firstname is required")
        })

        it("should lastname empty string and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : '',
                email: 'user@mail.com',
                password: '12345678',
            }

            const response = await request(app)
            .post('/users/register')
            .send(user)

            expect(response.status).toBe(400)
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body.message).toBe("Lastname is required")
        })

        it("should email already and response 400", async() => {
            const user = {
                firstName : 'user',
                lastName : 'user',
                email: 'ghandurathallah10@gmail.com',
                password: '12345678',
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

    describe('POST /users/login - user login', ()=>{
        it("should login user and response 200", async() => {
            const user = {
                email: 'ghandurathallah10@gmail.com',
                password : '12345678'
            }

            const response = await request(app)
            .post('/users/login')
            .send(user)

            expect(response.status).toBe(200)
            expect(typeof response.body).toBe('object')
        })

        it("should wrong password and response 401", async() => {
            const user = {
                email: 'ghandurathallah10@gmail.com',
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



    describe("PATCH /users",() => {
        it("should success patch update verify and response 200", async function () {
            // const isVerified = false

            const res = await request(app)
            .patch(`/users?verify=${trueVerifyToken}`)
            

            expect(res.status).toBe(200)
        })

        // it("should failed patch update verify and response 400", async function () {
        //     // const isVerified = false
        //     const res = await request(app)
        //     .patch(`/users?verify=${falseVerifyToken}`)
            

        //     expect(res.status).toBe(400)
        // })
    })

    describe("PATCH /users/add",() => {
        it("should success patch add quota and response 200", async function () {
            const order_id = '1683698690643_3'
            const status_code = 200
            const res = await request(app)
            .patch(`/users/add?order_id=${order_id}&status_code=${+status_code}`)
            .set({access_token: createdToken })
            // console.log(res.body.message , "ini add ");

            expect(res.status).toBe(200)
            expect(typeof res.body.message).toEqual("string")
        })

        it("should failed patch add quota and response 400", async function () {
            const order_id = '1683698690643_3'
            const status_code = 201
            const res = await request(app)
            .patch(`/users/add?order_id=${order_id}&status_code=${+status_code}`)
            .set({access_token: createdToken })
            // console.log(res.body.message , "ini add ");

            expect(res.status).toBe(400)
            expect(typeof res.body.message).toEqual("string")
        })
    })

    describe("PATCH /users/reduce",() => {
        it("should success patch reduce quota and response 200", async function () {
            const res = await request(app)
            .patch('/users/reduce')
            .set({access_token: createdToken })

            expect(res.status).toBe(200)
        })

        it("should failed patch reduce quota and response 400", async function () {
            const res = await request(app)
            .patch('/users/reduce')
            .set({access_token: nullQuota })
            // console.log(res,"<<<ini error buat reducr quota")
            expect(res.status).toBe(400)
        })
    })

    describe('GET /users - get payment', () => {
        it('should get payment and response 200', async () => {
            const response = await request(app)
            .get("/users/payment")
            .set({access_token: createdToken})

            expect(response.status).toBe(201)
        })

        it("should failed get payment because without login and response 401", async function () {
            const res = await request(app)
            .get('/users/payment')


            expect(res.status).toBe(403)
            expect(res.body.message).toBe("Wrong access token")
        })

        it("should failed get payment because token is not valid and response 401", async function () {
            const res = await request(app)
            .get('/users/payment')
            .set({access_token:"123"})


            expect(res.status).toBe(403)
            expect(res.body.message).toBe("Wrong access token")

        })
    })
})
