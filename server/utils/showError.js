const joiErrMsg = require('./JoiErrorMessage');
const ErrRes = require('./errorResponse');

exports.showError = (next, error) => {
  const joiErr = joiErrMsg(error);
  return next(new ErrRes(joiErr.message, 400, joiErr.errorField));
};
