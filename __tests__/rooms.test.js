const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')
const deleteMockData = require('../lib/deleteMockData')


beforeAll(async function() {
    await insertMockData()
})

// afterAll(async function () {
//     await deleteMockData()
// })

describe('GET /rooms', () => {
    it("should return a list of rooms and response 200" , async () => {
        const response = await request(app)
        .get('/rooms')

        expect(response.status).toBe(200)
        expect(typeof response.body).toBe('object')
    })

    it("should return  a list of rooms with params id and response 200", async  () => {
        const res = await request(app)
        .get('/rooms/1')

        expect(res.status).toBe(200)
        expect(typeof res.body).toBe("object")
    })

    it("should return  a list of rooms with params id and response 404", async  () => {
        const res = await request(app)
        .get('/rooms/1000000')

        expect(res.status).toBe(404)
        expect(res.body.message).toBe("Room ID not found")
    })
})