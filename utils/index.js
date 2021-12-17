const bcrypt = require('bcrypt')
/*
  We did not end up hashing passwords,
  but leaving this file in the event we expand on this app
  in the future
*/




const genSalt = async (rounds) => await bcrypt.genSalt(rounds)

const hashPassword = async (password, salt) => await bcrypt.hash(password, salt)

const verifyPassword = async (inputPassword, storedPassword) => 
  await bcrypt.compare(inputPassword, storedPassword)


//{expiresIn: 3600}
const generateToken = (payload, config) => jwt.sign(payload, jwt_secret, config)


module.exports = {
  genSalt,
  hashPassword,
  verifyPassword,
  generateToken
}