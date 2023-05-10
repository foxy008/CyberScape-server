const { Rating } = require('../models');
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

async function insertRatingData() {
    try {
        await queryInterface.bulkDelete('Ratings',null, {
            truncate:true, restartIdentity:true, cascade:true
        })
        await Rating.bulkCreate([
            {
                "UserId": "1",
                "NFTId": "1",
                "value": 0.5
            },
            {
                "UserId": "2",
                "NFTId": "2",
                "value": 1.2
            },
            {
                "UserId": "3",
                "NFTId": "3",
                "value": 2.5
            },
            {
                "UserId": "4",
                "NFTId": "4",
                "value": 0.8
            },
            {
                "UserId": "5",
                "NFTId": "5",
                "value": 3.0
            }
        ])
        
    } catch (error) {
        // console.log(error);
    }
}

module.exports = insertRatingData;
