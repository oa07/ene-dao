export const loginValidator = (values) => {
  const err = {};
  if (!values.contactInfo) {
    err.contactInfo = 'Email or Phone number is Required';
  }
  if (!values.password) {
    err.password = 'Password is Required';
  }
  return err;
};
