const { User, Room, NFT, UserFavorite, RoomNFT, Rating } = require('../models');
// const fs = require('fs');
const { hashPass } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

async function insertUserData() {
    try {
        await queryInterface.bulkDelete('Users',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await User.bulkCreate([
            {
                firstName: "admin",
                lastName: "admin",
                email: "admin@admin.com",
                password: hashPass("12345"),
                quota: 500
            },
            {
                firstName: "user",
                lastName: "user",
                email: "user@users.com",
                password: hashPass("12345"),
                quota: 1000
            },
        ])
        // await User.bulkCreate(JSON.parse(fs.readFileSync('./data/users.json')));
        // await Artist.bulkCreate(JSON.parse(fs.readFileSync('./data/artists.json')));
        // await NFT.bulkCreate(JSON.parse(fs.readFileSync('./data/NFTs.json')));
        // await Room.bulkCreate(JSON.parse(fs.readFileSync('./data/rooms.json')));
        // await Rating.bulkCreate(JSON.parse(fs.readFileSync('./data/ratings.json')));
        // await UserFavorite.bulkCreate(JSON.parse(fs.readFileSync('./data/userFavorites.json')));
        // await RoomNFT.bulkCreate(JSON.parse(fs.readFileSync('./data/roomNFTs.json')));
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertUserData;
