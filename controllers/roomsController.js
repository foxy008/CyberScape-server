const { Room, NFT, RoomNFT, Artist } = require("../models");

class roomsController {
    static async getAllRooms(req, res, next) {
        try {
            const allRooms = await Room.findAll({
                include: [{
                    model: RoomNFT,
                    include: [{
                        model: NFT
                    }]
                }, {
                    model: Artist
                }]
            })

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
