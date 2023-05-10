// const { User, Room, NFT, UserFavorite, RoomNFT, Rating } = require('../models');
// // // const fs = require('fs');
// const { hashPass } = require('../helpers/bcrypt')
// const { sequelize } = require('../models')
// const queryInterface = sequelize.getQueryInterface()

// async function insertUserData() {
//     try {
//         await queryInterface.bulkDelete('Users',null, {
//             truncate:true, restartIdentity:true, cascade:true
//         })
//         await User.bulkCreate([
//             {
//                 firstName: "admin",
//                 lastName: "admin",
//                 email: "admin@admin.com",
//                 password: hashPass("12345678"),
//                 quota: 500
//             },
//             {
//                 firstName: "user",
//                 lastName: "user",
//                 email: "user@users.com",
//                 password: hashPass("12345678"),
//                 quota: 1000
//             },
//         ])
        
//     } catch (error) {
//         // console.log(error);
//     }
// }

// module.exports = insertUserData;
