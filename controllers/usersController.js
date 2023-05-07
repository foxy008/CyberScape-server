const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, NFT, UserFavorite, Rating, RoomNFT, Room, Artist } = require("../models");

class usersController {
    static async register(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;

            const registeredUser = await User.create({
                firstName,
                lastName,
                email,
                password
            });

            res.status(201).json({
                message: `User with email ${registeredUser.email} has been created`
            });
        } catch (error) {
            next(error);
        }
    }
 
    static async login(req, res, next) {
        try {
            const {
                email,
                password,
            } = req.body;

            console.log(req.body);
            const findUser = await User.findOne({
                where: {
                    email
                }
            });

            if (!findUser) {
                throw { name: 'LoginFailed'}
            }

            const validatePass = comparePass(password, findUser.password)

            if (!validatePass) {
                throw { name: 'LoginFailed'}
            }

            const payload = {
                id: findUser.id
            }

            const access_token = signToken(payload);

            res.status(200).json({
                access_token
            });
        } catch (error) {
            next(error);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const { id } = req.loggedInUser;

            const foundUser = await User.findByPk(id, {
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: UserFavorite,
                    include: [{
                        model: NFT,
                        include: [{
                            model: RoomNFT,
                            include: [{
                                model: Room,
                                include: [{
                                    model: Artist
                                }]
                            }]
                        }]
                    }]
                }, {
                    model: Rating,
                    include: [{
                        model: NFT
                    }]
                }]
            })

            res.status(200).json(foundUser);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = usersController;
