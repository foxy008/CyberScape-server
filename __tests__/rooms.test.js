const request = require('supertest')
const app = require('../app')
const insertRoomData = require('../lib/insertRoomData')


beforeAll(async function() {
    await insertRoomData()
  
})

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
        .get('/rooms/100')

        expect(res.status).toBe(404)
        expect(res.body.message).toBe("Room ID not found")
    })
})