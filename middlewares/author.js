const { User } = require("../models");

module.exports = async function author(req, res, next) {
    try {
        const { id } = req.loggedInUser;
        const foundedUser = await User.findByPk(id);
        const { isVerified } = foundedUser
        req.foundedUser = foundedUser;

        if (isVerified) {
            next() 
        } 
        else {
            throw { name: 'UserNotAvailable'}
        }
    } catch (error) {
        next(error)
    }
}
