const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const nodeMailer = require('../helpers/nodemailer');
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
            nodeMailer(user.email)
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

    // static async getToken(req, res, next) {
    //     try {
    //         // Create Snap API instance
    //         const user = req.user
    //         let snap = new midtransClient.Snap({
    //             // Set to true if you want Production Environment (accept real transaction).
    //             isProduction: false,
    //             serverKey: 'SB-Mid-server-21Nn9InDllmbTCgkwfEoFZN4'
    //         });
    //         const topUp = await User.findByPk(id)

    //         let parameter = {
    //             "transaction_details": {
    //                 "order_id": "TRANSACTION_ID_" + Math.floor(Math.random() * 238368756478) + 12384576517,
    //                 "gross_amount": topUp.price
    //             },
    //             "credit_card": {
    //                 "secure": true
    //             },
    //             "customer_details": {
    //                 "firstName": user.firstName,
    //                 "lastName": user.lastName,
    //                 "email": user.email,
    //             }
    //         };

    //         const midtrans_token = await snap.createTransaction(parameter)
    //         res.status(201).json(midtrans_token)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static async addQouta(req, res, next) {
        try {
            const {id} =req.loggedInUser 
            const user = await User.findByPk(id)

            await User.update({quota: user.quota  +100 } ,{where: {id}})

            res.status(200).json()
        } catch (error) {
            console.log(error)
        }
    }

    static async reduceQouta(req, res, next) {
        try {
            const {id} =req.loggedInUser 
            const user = await User.findByPk(id)

            await User.update({quota: user.quota  -100 } ,{where: {id}})

            res.status(200).json()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = usersController;
