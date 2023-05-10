const { Rating, NFT } = require("../models");

class ratingsController {
    static async postNewRating(req, res, next) {
        try {
            const { id } = req.loggedInUser;
            const NFTId = req.params.id;
            const { value } = req.query;

            if (!value) throw { name: 'RatingIsEmpty' }

            const [rating, created] = await Rating.findOrCreate({
                where: {
                    UserId: id,
                    NFTId,
                },
                defaults: {
                    UserId: id,
                    NFTId,
                    value
                }
            })

            if (!created) {
                throw { name: 'RatingExisted' }
            }

            const ratedNFT = await NFT.findByPk(NFTId);
            let { averageRating, ratingLength } = ratedNFT;
            averageRating = averageRating * ratingLength
            ratingLength += 1;
            averageRating = (averageRating + +value) / ratingLength

            await NFT.update({
                averageRating,
                ratingLength
            },
            {
                where: {
                    id: NFTId
                }
            })

            res.status(201).json({
                message: `Rating for NFT #${rating.NFTId} by User # ${rating.UserId} has been added`
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

            const previousRating = await Rating.findOne({
                where: {
                    NFTId,
                    UserId: id
                }
            });

            const updated = await Rating.update({
                value
            }, {
                where: {
                    NFTId,
                    UserId: id
                }
            })
            // console.log(updated,"updated")


            const ratedNFT = await NFT.findByPk(NFTId);
            let { averageRating, ratingLength } = ratedNFT;
            averageRating = averageRating * ratingLength;
            averageRating = (averageRating - previousRating.value + +value) / ratingLength;
            // console.log({ averageRating, ratingLength });
            await NFT.update({
                averageRating,
                ratingLength
            },
            {
                where: {
                    id: NFTId
                }
            })

            res.status(201).json({
                message: `Rating for NFT #${NFTId} by User # ${id} has been updated`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ratingsController;
