const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')
const { User } = require('../models')
const { signToken } = require('../helpers/jwt')

let token;
let user;
beforeAll(async function (){
    await insertMockData()
    user = await User.findOne()

    token = signToken( {id : user.id })
})


describe("POST /ratings",() => {
    it("should success add rating and response 201", async function () {
        const NFTId = 1
        const UserId = user.id
        const res = await request(app)
        .post(`/ratings/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(201)
    })

    it("should failed add rating and response 404", async function () {
        const NFTId = 1000
        const UserId = user.id
        const res = await request(app)
        .post(`/ratings/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe("NFT not found")
    })
})

describe("PATCH /ratings",() => {
    it("should success patch rating and response 201", async function () {
        const NFTId = 1
        const UserId = user.id
        const res = await request(app)
        .patch(`/ratings/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(201)
    })

    it("should failed patch rating and response 404", async function () {
        const NFTId = 1000
        const UserId = user.id
        const res = await request(app)
        .patch(`/ratings/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe("NFT not found")
    })
})