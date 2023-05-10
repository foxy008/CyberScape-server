const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function verify(req, res, next) {
    try {
        const { verify } = req.query;

        const payload = verifyToken(verify);

        const foundedUser = await User.findByPk(payload.id);

        // if (!foundedUser) {
        //     throw { name: 'UserNotFound' }
        // }

        const verifiedEmail = foundedUser.email;
        const { isVerified } = foundedUser;
        req.foundedUser = foundedUser;
        // console.log(foundedUser, email);
        // console.log({ id, isVerified }, '<-- get logged in user');

        // if (isVerified) {
        //     throw { name: 'HadBeenVerified' }
        // }

        if (payload.email === verifiedEmail) {
            next();
        } else {
            // Ntar dimasukkin nya 404 Unauthorized ya
            // throw { name: 'WrongVerifyToken' }
        }

    } catch (error) {
        // next(error)
    }
}
