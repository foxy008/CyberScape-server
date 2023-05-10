const { Room, NFT, RoomNFT, Artist } = require("../models");

class roomsController {
    static async getAllRooms(req, res, next) {
        try {
            const { recent } = req.query;

            let sequelizeQuery = {
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }, {
                    model: Artist
                }],
                order: [
                    ['updatedAt', 'ASC']
                ]
            }

            if (recent) {
                sequelizeQuery = {
                    ...sequelizeQuery,
                    limit: 4,
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }
            }

            const allRooms = await Room.findAll(sequelizeQuery)

            res.status(200).json(allRooms);
            // console.log(allRooms, "<<<<<<<<<");

        } catch (error) {
            // console.log(error);
            // next(error)
        }
    }

    static async getRoomById(req, res, next) {
        try {
            const { id } = req.params;

            // console.log(id);

            const selectedRoom = await Room.findByPk(id, {
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }, {
                    model: Artist
                }]

            })
            
            // console.log(selectedRoom);

            if(!selectedRoom){
                throw { name : "RoomNotFound"}
            } else {
                res.status(200).json(selectedRoom);
            }


        } catch (error) {
            next(error);
        }
    }
}

module.exports = roomsController;
