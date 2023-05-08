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
//     it('should create new NFT and response 201', async() => {
//         const NFT = {
//             "name": "Larva Labs (CryptoPunks)",
//             "website": "https://opensea.io/collection/cryptopunks",
//             "avatarUrl": "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=1920",
//             "address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"    
//         }
//         const response = await request(app)
//         .post('/nfts')
//         .send(NFT)

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