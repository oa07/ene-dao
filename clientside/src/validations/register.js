export const regCustomerValidator = (values) => {
  const err = {};
  if (!values.fullname) {
    err.fullname = 'Fullname is Required';
  }
  if (!values.email) {
    err.email = 'Email is Required';
  }
  if (!values.password) {
    err.password = 'Password is Required';
  }
  if (!values.confirmPassword) {
    err.confirmPassword = 'Confirm Password is Required';
  }
  if (!values.homeAddress) {
    err.homeAddress = 'Home Address is Required';
  }
  if (!values.flatNo) {
    err.flatNo = 'Flat No is Required';
  }
  if (!values.contactNo) {
    err.contactNo = 'ContactNo is Required';
  }
  return err;
};
