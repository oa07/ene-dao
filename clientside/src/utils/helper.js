import Isemail from 'isemail';

export const checkNull = (data) => {
  return data === '' || data === null || data === undefined;
};

export const emailCheck = (emailID) => {
  return Isemail.validate(emailID);
};

export const phoneNoCheck = (number) => {
  const re = /^[0-9]+$/;
  return re.test(number) && number.length === 11;
};
