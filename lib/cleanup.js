const { User, Room, NFT, UserFavorite, RoomNFT, Rating } = require('../models');

async function cleanup() {
    try {
        // await Rating.destroy({
        //     restartIdentity: true,
        //     truncate: true,
        //     cascade: true
        // });

        // await RoomNFT.destroy({
        //     restartIdentity: true,
        //     truncate: true,
        //     cascade: true
        // });

        // await UserFavorite.destroy({
        //     restartIdentity: true,
        //     truncate: true,
        //     cascade: true
        // });

        // await NFT.destroy({
        //     restartIdentity: true,
        //     truncate: true,
        //     cascade: true
        // });

        // await Room.destroy({
        //     restartIdentity: true,
        //     truncate: true,
        //     cascade: true
        // });

        await User.destroy({
            restartIdentity: true,
            truncate: true,
            cascade: true
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = cleanup();
