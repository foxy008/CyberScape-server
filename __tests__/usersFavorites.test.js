const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const { UserFavorite } = require('../models');

// const insertUserFavoriteData = require('../lib/insertUserFavoriteData')

const { signToken } = require('../helpers/jwt');


let token;
beforeAll(async function (){
    await queryInterface.bulkDelete('UserFavorites',null, {
        truncate:true, restartIdentity:true, cascade:true
    })
    await UserFavorite.bulkCreate([
        {
            "UserId": "1",
            "NFTId": "1"
        },
        {
            "UserId": "2",
            "NFTId": "2"
        }
    ])
    token = signToken({id : 1 })

})

describe("POST /favorites",() => {
    it("should success add favorite and response 201", async function () {
        const NFTId = 3
        const UserId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)
        .set({accesstoken:token})

        expect(res.status).toBe(201)
    })

    it("should failed add favorite and response 400", async function () {
        const NFTId = 1000
        const UserId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)
        .set({accesstoken:token})

        console.log(res);
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("Favorite had been created before")
    })

    it("should failed add rating because without login and response 401", async function () {
        const NFTId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)

        
        expect(res.status).toBe(403)
        expect(res.body.message).toBe("Your verification link is not valid!")
    })

    it("should failed add rating because token is not valid and response 401", async function () {
        const NFTId = 1
        const res = await request(app)
        .get(`/favorites/${NFTId}`)
        .set({accesstoken:"123"})


        expect(res.status).toBe(403)
        expect(res.body.message).toBe("Your verification link is not valid!")

    })
})

describe("DELETE /favorites",() => {
    it("should success delete favorite and response 200", async function () {
        const NFTId = 1
        const UserId = 1
        const res = await request(app)
        .delete(`/favorites/${NFTId}`)
        .set({accesstoken:token})

        expect(res.status).toBe(200)
    })

    it("should failed delete favorite and response 404", async function () {
        const NFTId = 10000
        const UserId = 1
        const res = await request(app)
        .delete(`/favorites/${NFTId}`)
        .set({accesstoken:token})

        expect(res.status).toBe(404)
        expect(res.body.message).toBe("Favorite ID not found")
    })

    it("should failed add rating because without login and response 401", async function () {
        const NFTId = 1
        const res = await request(app)
        .post(`/favorites/${NFTId}`)

        
        expect(res.status).toBe(403)
        expect(res.body.message).toBe("Your verification link is not valid!")
    })

    it("should failed add rating because token is not valid and response 401", async function () {
        const NFTId = 1
        const res = await request(app)
        .get(`/favorites/${NFTId}`)
        .set({accesstoken:"123"})


        expect(res.status).toBe(403)
        expect(res.body.message).toBe("Your verification link is not valid!")

    })
})