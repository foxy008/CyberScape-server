const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')
const { UserFavorite } = require("../models");
const { signToken } = require('../helpers/jwt')

let token;
let user;
beforeAll(async function (){
    await insertMockData()
    user = await UserFavorite.findOne()
    console.log(user, "ini user favorit");
    token = signToken( {id : user.id })
})


describe("POST /favorites",() => {
    it("should success add favorite and response 201", async function () {
        const NFTId = 1
        const UserId = user.id
        const res = await request(app)
        .post(`/favorites/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(201)
    })

    it("should failed add favorite and response 404", async function () {
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

describe("DELETE /favorites",() => {
    it("should success delete favorite and response 200", async function () {
        const NFTId = 1
        const UserId = user.id
        const res = await request(app)
        .delete(`/favorites/${UserId}`)
        .set({accessToken:token})
        .send({
            NFTId , UserId
        })
        expect(res.status).toBe(200)
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