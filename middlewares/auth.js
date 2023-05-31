const { verifyToken } = require("../helpers/jwt");

module.exports = function auth(req, res, next) {
    try {
        const { access_token } = req.headers;

        req.loggedInUser = verifyToken(access_token);

        next();
    } catch (error) {
        next(error);
    }
};
