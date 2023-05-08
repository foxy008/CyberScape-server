const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')
const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const deleteMockData = require('../lib/deleteMockData')

let token;
beforeAll(async function (){
    await insertMockData()
    token = signToken( {id : 1 })
    console.log('ini jalan');

})

// afterAll(async () => {
//     await deleteMockData()
// })

describe("POST /ratings",() => {
    it("should success add rating and response 201", async function () {
        const NFTId = 1
        const res = await request(app)
        .post(`/ratings/${NFTId}?value=10`)
        .set({access_token:token})
        expect(res.status).toBe(201)
    })

    it("should failed add rating and response 404", async function () {
        const NFTId = 1000
        const res = await request(app)
        .post(`/ratings/${NFTId}`)
        .set({access_token:token})
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe("NFT not found")
    })
})

describe("PATCH /ratings",() => {
    it("should success patch rating and response 201", async function () {
        const NFTId = 1
        const res = await request(app)
        .patch(`/ratings/${NFTId}`)
        .set({access_token:token})
        expect(res.status).toBe(201)
    })

    it("should failed patch rating and response 404", async function () {
        const NFTId = 1000
        const res = await request(app)
        .patch(`/ratings/${NFTId}`)
        .set({access_token:token})
        expect(res.status).toBe(404)
        expect(res.body.msg).toBe("NFT not found")
    })
})