const { userModel, adminModel } = require('../auth/auth.model');

const roleChooser = role => {
  const upRole = role.toUpperCase();
  if (
    upRole === 'USER' ||
    upRole === 'CUSTOMER' ||
    upRole === 'DELIVERYMAN' ||
    upRole === 'DELIVERY MAN' ||
    upRole === 'SHOPPER'
  )
    return userModel;
  if (upRole === 'ADMIN') return adminModel;
};

module.exports = roleChooser;
