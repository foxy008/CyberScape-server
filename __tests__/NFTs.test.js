const request = require('supertest')
const app = require('../app')
const insertNFTData = require('../lib/insertNFTData')

beforeAll(async function() {
    await insertNFTData()
})

// afterAll(async function () {
//     await cleanup()
// })
// describe('POST /nfts', ()=>{
//     it('should create new NFT and response 201', async() => {//
//         const response = await request(app)
//         .post('/nfts')
//         expect(response.status).toBe(201)
//         expect(response.body).toEqual(expect.any(Object))
//     })
// })

describe('GET /nfts', () => {
    it("should return a list of NFT Top Collection and response 200" , async () => {
        const response = await request(app)
        .get('/nfts')

        expect(response.status).toBe(200)
        expect(typeof response.body).toBe('object')
    })
})
