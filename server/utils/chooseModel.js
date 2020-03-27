const { userModel, adminModel } = require('../auth/auth.model');

const roleChooser = role => {
  const upRole = role.toUpperCase();
  if (
    upRole === 'USER' ||
    upRole === 'CUSTOMER' ||
    upRole === 'DELIVERYMAN' ||
    upRole === 'DELIVERY MAN'
  )
    return userModel;
  if (upRole === 'ADMIN') return adminModel;
  console.log('Here found an exception');
  console.log(upRole);
};

module.exports = roleChooser;
