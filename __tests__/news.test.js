const request = require('supertest')
const app = require('../app')


describe('GET /nft-news', () => {
    it("should return a list a New NFT Collection and response 200" , async () => {
        const response = await request(app)
        .get('/nft-news')

        expect(response.status).toBe(200)
        expect(typeof response.body).toBe('object')
    })
})