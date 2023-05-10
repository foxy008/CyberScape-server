const request = require('supertest')
const app = require('../app')
const { Room } = require('../models');
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
// const insertRoomData = require('../lib/insertRoomData')


beforeAll(async function() {
    await queryInterface.bulkDelete('Rooms',null, {
        truncate:true, restartIdentity:true, cascade:true
    })
    await Room.bulkCreate([
        {
            "name": "Top Collection",
            "address": "-",
            "cursor": " - ",
            "ArtistId": "1"
    
        },
        {
            "name": "All Collection",
            "address": "-",
            "cursor": " - ",
            "ArtistId": "2"
        }
    ])
  
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