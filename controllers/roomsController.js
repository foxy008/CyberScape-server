const { Room, NFT, RoomNFT } = require("../models");

class roomsController {
    static async getAllRooms(req, res, next) {
        try {
            const allRooms = await Room.findAll({
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }]
            })
            .shift();

            res.status(200).json(allRooms);
        } catch (error) {
            next(error);
        }
    }

    static async getTopCollection(req, res, next) {
        try {
            const topRoom = await Room.findByPk(1, {
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }]
            })

            res.status(200).json(topRoom);
        } catch (error) {
            next(error);
        }
    }

    static async getRoomById(req, res, next) {
        try {
            const { id } = req.params;

            const selectedRoom = await Room.findByPk(id, {
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }]
            })

            res.status(200).json(selectedRoom);
        } catch (error) {
            next(error);
        }
    }

    static async postRoom(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = roomsController;
