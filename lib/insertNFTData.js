const { NFT } = require('../models')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

async function insertNFTData() {
    try {
        await queryInterface.bulkDelete('NFTs',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await NFT.bulkCreate([
            {
                "token": "1001",
                "title": "The Garden of Earthly Delights",
                "description": "A triptych painting by Hieronymus Bosch depicting a lush and surreal landscape populated with fantastic creatures and vivid symbolism.",
                "imageUrl": "https://www.example.com/images/1001.jpg"
            },
            {
                "token": "1002",
                "title": "Starry Night",
                "description": "A painting by Vincent van Gogh featuring a swirling sky and a sleepy town below.",
                "imageUrl": "https://www.example.com/images/1002.jpg"
            },
            {
                "token": "1003",
                "title": "The Persistence of Memory",
                "description": "A surrealist painting by Salvador Dali featuring melting clocks in a desert landscape.",
                "imageUrl": "https://www.example.com/images/1003.jpg"
            },
            {
                "token": "1004",
                "title": "Les Demoiselles d'Avignon",
                "description": "A cubist painting by Pablo Picasso depicting five nude women in a brothel.",
                "imageUrl": "https://www.example.com/images/1004.jpg"
            },
            {
                "token": "1005",
                "title": "The Scream",
                "description": "A painting by Edvard Munch featuring a figure with an agonized expression against a blood-red sky.",
                "imageUrl": "https://www.example.com/images/1005.jpg"
            }   
        ])
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertNFTData;
