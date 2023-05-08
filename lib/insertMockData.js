const { User, Room, NFT, UserFavorite, RoomNFT, Rating } = require('../models');

const fs = require('fs');


async function insertMockData() {
    try {
        // await User.bulkCreate(JSON.parse(fs.readFileSync('./data/users.json')));
        // await Artist.bulkCreate(JSON.parse(fs.readFileSync('./data/artists.json')));
        // await NFT.bulkCreate(JSON.parse(fs.readFileSync('./data/NFTs.json')));
        await Room.bulkCreate(JSON.parse(fs.readFileSync('./data/rooms.json')));
        // await Rating.bulkCreate(JSON.parse(fs.readFileSync('./data/ratings.json')));
        // await UserFavorite.bulkCreate(JSON.parse(fs.readFileSync('./data/userFavorites.json')));
        // await RoomNFT.bulkCreate(JSON.parse(fs.readFileSync('./data/roomNFTs.json')));
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertMockData;
