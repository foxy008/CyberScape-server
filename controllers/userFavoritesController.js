const { UserFavorite } = require("../models");

class userFavoritesController {
    static async postNewFavorite(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;

            const [rating, created] = await Rating.findOrCreate({
                UserId: id,
                NFTId
            })

            if (!created) {
                throw { name: 'FavoriteExisted' }
            }

            res.status(201).json({
                message: `User #${rating.UserId} has favorited NFT #${rating.NFTId}`
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteExistingFavorite(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;

            const deleted = await Rating.findOrCreate({
                UserId: id,
                NFTId
            })

            if (!deleted) {
                throw { name: 'FavoriteNotFound' }
            }

            res.status(201).json({
                message: `User #${id} has favorited NFT #${NFTId}`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userFavoritesController;
