const request = require('supertest')
const app = require('../app')
const insertUserFavoriteData = require('../lib/insertUserFavoriteData')

const { signToken } = require('../helpers/jwt');


let token;
beforeAll(async function (){
    await insertUserFavoriteData()
    token = signToken({id : 1 })

})

describe("POST /favorites",() => {
    it("should success add favorite and response 201", async function () {
        const NFTId = 3
        const UserId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)
        .set({access_token:token})

        expect(res.status).toBe(201)
    })

    it("should failed add favorite and response 400", async function () {
        const NFTId = 1000
        const UserId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)
        .set({access_token:token})

        console.log(res);
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("Favorite had been created before")
    })
})

describe("DELETE /favorites",() => {
    it("should success delete favorite and response 200", async function () {
        const NFTId = 1
        const UserId = 1
        const res = await request(app)
        .delete(`/favorites/${NFTId}`)
        .set({access_token:token})

        expect(res.status).toBe(200)
    })

    it("should failed delete favorite and response 404", async function () {
        const NFTId = 10000
        const UserId = 1
        const res = await request(app)
        .delete(`/favorites/${NFTId}`)
        .set({access_token:token})

        expect(res.status).toBe(404)
        expect(res.body.message).toBe("Favorite ID not found")
    })
})