const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function verify(req, res, next) {
    try {
        const { verify } = req.query;
        const { id } = req.loggedInUser;
        const foundedUser = await User.findByPk(id);
        const verifiedEmail = foundedUser.email;
        const { email } = verifyToken(verify);
        req.foundedUser = foundedUser;
        console.log(foundedUser, email);

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
