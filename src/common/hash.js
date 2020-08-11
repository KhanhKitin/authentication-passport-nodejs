const bcrypt = require('bcryptjs');
const saltRound = 10;

let hash = (plainText) => {
    return bcrypt.hash(plainText || '', saltRound);
};

let compare = (plainText, hashText) => {
    return bcrypt.compare(plainText || '', hashText || '');
}

module.exports = {
    hash,
    compare
};