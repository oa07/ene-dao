const nodemailer = require('nodemailer');
const { emailID, emailPassword, port } = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailID,
    pass: emailPassword
  }
});

const host = `http://localhost:${port}/api/v1`;

module.exports.sendMailForVerifyAccount = async (
  username,
  usermail,
  token,
  role
) => {
  const link = `${host}/auth/verifyAccount?token=${token}&role=${role}`;
  const mailOptions = {
    from: emailID,
    to: usermail,
    subject: 'Verify your account',
    html: `
      <div> 
      <p>Hi ${username},</p>
      <p>Thank you for registration. Click Here for verify your account.</p>
      <div> <a href="${link}">Verify account</a> </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports.sendMailForgetPasswordToken = async (
  username,
  usermail,
  token,
  role
) => {
  const link = `${host}/auth/forgetPassword?token=${token}&role=${role}`;
  const mailOptions = {
    from: emailID,
    to: usermail,
    subject: 'Reset your password',
    html: `
      <div> 
      <p>Hi ${username},</p>
      <p>Thank you for registration. Click Here for verify your account.</p>
      <div> <a href="${link}">Verify account</a> </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
