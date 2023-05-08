const request = require('supertest')
const app = require('../app')
const insertRatingData = require('../lib/insertRatingData')
const { signToken } = require('../helpers/jwt')

let token;
beforeAll(async function (){
    await insertRatingData()
    token = signToken( {id : 1 })

})


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