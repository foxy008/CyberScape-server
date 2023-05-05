const jwt = require('jsonwebtoken');

module.exports = {
    signToken: payload => jwt.sign(payload, process.env.JWT_SECRET_KEY),
    verifyToken: token => jwt.verify(token, process.env.JWT_SECRET_KEY)
}
