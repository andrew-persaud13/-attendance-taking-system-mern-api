const nodemailer = require('nodemailer')
const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = require('../config')
const sendEmail = async ({ to, subject, text }) => {
  // 1 create a transporter  ---this will send the email
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    PORT: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    },
  })

  //2 Define the email options template
  const mailOptions = {
    from: 'Lassonde School Board <lsb@eecs4312.com>',
    to,
    subject,
    text
  }


  // 3 Actually send email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail