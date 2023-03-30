const crypto = require('crypto');

exports.sha1 = function(password) {
    const hash = crypto.createHash('sha1');
    hash.update(password);
    return hash.digest('hex');
};
