const { verifyToken } = require("../helpers/jwt");

module.exports = function auth(req, res, next) {
    try {
        const { accesstoken } = req.headers;

        req.loggedInUser = verifyToken(accesstoken);

        next();
    } catch (error) {
        next(error);
    }
};
