const {  Room } = require('../models');
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

async function insertRoomData() {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

module.exports = insertRoomData;
