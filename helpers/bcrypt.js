const bcrypt = require('bcryptjs');

module.exports = {
    hashPass: password => bcrypt.hashSync(password, 10),
    comparePass: (input, hash) => bcrypt.compareSync(input, hash)
}
