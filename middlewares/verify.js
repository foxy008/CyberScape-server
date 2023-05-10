const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function verify(req, res, next) {
    try {
        const { verify, id } = req.query;

        const foundedUser = await User.findByPk(id);

        if (!foundedUser) {
            throw { name: 'UserNotFound' }
        }

        const verifiedEmail = foundedUser.email;
        const { isVerified } = foundedUser;
        const { email } = verifyToken(verify);
        req.foundedUser = foundedUser;
        // console.log(foundedUser, email);
        // console.log({ id, isVerified }, '<-- get logged in user');

        if (isVerified) {
            throw { name: 'HadBeenVerified' }
        }

        if (email === verifiedEmail) {
            next();
        } else {
            // Ntar dimasukkin nya 404 Unauthorized ya
            throw { name: 'WrongVerifyToken' }
        }

    } catch (error) {
        next(error)
    }
}
