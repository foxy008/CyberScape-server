const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const nodeMailer = require('../helpers/nodemailer');
const { User, NFT, UserFavorite, Rating, RoomNFT, Room, Artist, Log } = require("../models");
const midtransClient = require('midtrans-client');

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

            const payload = signToken({
                email: registeredUser.email
            });

            nodeMailer(registeredUser.email, payload);

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

    static async getToken(req, res, next) {
        try {
            // Create Snap API instance
            const { firstName, lastName, email, id } = req.loggedInUser;
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            const order_id = new Date().getTime() + "_" + id;

            let parameter = {
                "transaction_details": {
                    order_id,
                    "gross_amount": 100_000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    firstName,
                    lastName,
                    email
                }
            };

            const midtrans_token = await snap.createTransaction(parameter);
            console.log("Retrieved snap token:", midtrans_token);

            // Tambahin masukin entri ke tabel Logs

            await Log.create({
                UserId : id, orderId : order_id
            })

            res.status(201).json(midtrans_token)
        } catch (error) {
            console.log(error)
        }
    }

    static async addQuota(req, res, next) {
        try {
            // Dapetin query order_id nya & status_code
            const { order_id, status_code } = req.query;

            // Cari entri Logs dimana order_idnya sama kayak dari query
            const log = await Log.findOne({
                where: {
                    orderId: order_id
                }
            })
            // console.log(log);

            // Cek status dari Log yang dibalikin dari db Logs yang diatas
            if(log.status !== "Pending"){
                throw { name : "InvalidOrder"}
            }
            // Jika 200 maka dirubah status pada Log = Success, lainnya status pada log = Failed
            if (status_code !== 200) {
                await Log.update({status: "Failed"},{
                    where : { id }
                })
                throw { name: "FailedPayment"}
            }

            // Dibawah ini if berhasil , yang kondisi bukan status code 200 di throw error
            if(status_code === 200){
                await Log.update({status: "Success"},{
                    where : { id }
                })
            }
                let { id, quota } = req.foundedUser;
    
                quota += 1;
    
                await User.update({
                    quota
                } ,{
                    where: {
                        id
                    }
                }) 
            

            // Status code mestinya 200, cm 201 yang buat post
            res.status(200).json({
                message: `Quota for User ID #${id} has been increased to ${quota}`
            })
        } catch (error) {
            next(error);
        }
    }

    static async reduceQuota(req, res, next) {
        try {
            let { id, quota } = req.foundedUser;

            if (quota < 1) {
                throw { name: 'NullQuota'}
            }

            quota -= 1;

            await User.update({
                quota
            } ,{
                where: {
                    id
                }
            })

            // Status code mestinya 200, cm 201 yang buat post
            res.status(200).json({
                message: `Quota for User ID #${id} has been reduced to ${quota}`
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateVerified ( req , res , next) {
        try {
            const { id } = req.foundedUser;

            const updated = await User.update({
                isVerified: true
            }, {
                where: {
                    id
                }
            })

            if (!updated) {
                throw { name: 'UserUpdateFailed' }
            }

            // Status code mestinya 200, cm 201 yang buat post
            res.status(200).json({
                message : `User with ID #${id} has been verified`
            });

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = usersController;
