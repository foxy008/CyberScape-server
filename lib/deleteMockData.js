const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()


async function deleteMockData() {
    try{
        await queryInterface.bulkDelete('Users',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await queryInterface.bulkDelete('UserFavorites',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await queryInterface.bulkDelete('NFTs',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await queryInterface.bulkDelete('Rooms',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await queryInterface.bulkDelete('Artists',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await queryInterface.bulkDelete('RoomNFTs',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteMockData;
