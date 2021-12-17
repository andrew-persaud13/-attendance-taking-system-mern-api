const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config')

const Secretary = require('../database/models/secretary')
const Parent = require('../database/models/parent')
const Teacher = require('../database/models/teacher')
const SupplyTeacher = require('../database/models/supplyTeacher')

const authorize = (role) => async (req, res, next) => {
  role = role || req.params.role


  //check token is valid
  const token = req.headers.authtoken && req.headers.authtoken.split(' ')[1]
 
  if (!token) return notAuthorized(res)

  const decodedToken = jwt.verify(token, jwt_secret) || null
 
  if (!decodedToken) return notAuthorized(res)

  const { _id, role : payloadRole } = decodedToken
  //
  
  //check role (store role in token payload)
  if (role !== payloadRole) return notAuthorized(res)

  //make sure user still exists 
  let user = null
  if (role === 'secretary') user = await Secretary.findOne({ _id }).populate('school')
  if (role === 'parent') user = await Parent.findOne({ _id })
  if (role === 'teacher') {
    user = await Teacher.findOne({ _id })
    if (!user) {
      user = await SupplyTeacher.findOne({ _id })
    }
  }

  if (!user) return notAuthorized(res)
  
  req.user = user

  next()
}


const notAuthorized = (res) => res.status(401).json({ message: 'Not authorized.' })

module.exports = authorize