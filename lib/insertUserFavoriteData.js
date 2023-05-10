// const { UserFavorite } = require('../models');
// const { sequelize } = require('../models')
// const queryInterface = sequelize.getQueryInterface()

// async function insertUserFavoriteData() {
//     try {
//         await queryInterface.bulkDelete('UserFavorites',null, {
//             truncate:true, restartIdentity:true, cascade:true
//         })
//         await UserFavorite.bulkCreate([
//             {
//                 "UserId": "1",
//                 "NFTId": "1"
//             },
//             {
//                 "UserId": "2",
//                 "NFTId": "2"
//             }
//         ])
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = insertUserFavoriteData;
