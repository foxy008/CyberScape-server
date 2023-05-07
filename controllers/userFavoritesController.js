const { UserFavorite } = require("../models");

class userFavoritesController {
    static async postNewFavorite(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;

            const [rating, created] = await UserFavorite.findOrCreate({
                where: {
                    UserId: id,
                    NFTId
                },
                defaults: {
                    UserId: id,
                    NFTId
                }
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

            const deleted = await UserFavorite.destroy({
                where: {
                    UserId: id,
                    NFTId
                }
            })

            if (!deleted) {
                throw { name: 'FavoriteNotFound' }
            }

            res.status(200).json({
                message: `User #${id} has unfavorited NFT #${NFTId}`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userFavoritesController; 
