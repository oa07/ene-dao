const crypto = require('crypto');

module.exports = () => {
  const token = crypto.randomBytes(20).toString('hex');
  const hashToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  return hashToken;
};
