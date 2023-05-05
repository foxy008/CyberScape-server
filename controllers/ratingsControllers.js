const { Rating } = require("../models");

class ratingsController {
    static async postNewRating(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;
            const { value } = req.query;

            const [rating, created] = await Rating.findOrCreate({
                UserId: id,
                NFTId,
                value
            })

            if (!created) {
                throw { name: 'RatingExisted' }
            }

            res.status(201).json({
                message: `Rating for NFT #${rating.NFTId} by User # ${rating.UserId} has been created`
            });
        } catch (error) {
            next(error);
        }
    }

    static async patchExistingRating(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;
            const { value } = req.query;

            const updated = await Rating.update({
                value
            }, {
                where: {
                    NFTId,
                    UserId: id
                }
            })

            if (!updated) {
                throw { name: 'RatingNotFound' }
            }

            res.status(201).json({
                message: `Rating for NFT #${NFTId} by User # ${id} has been updated`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ratingsController;
