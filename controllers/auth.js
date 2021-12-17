const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config')

const Secretary = require('../database/models/secretary')
const Parent = require('../database/models/parent')
const Teacher = require('../database/models/teacher')
const SupplyTeacher = require('../database/models/supplyTeacher')


exports.loginController = async (req, res) => {
  const { account, password, role } = req.body

  if (!account || !password) return res.status(400).json({ message: 'Please provide account number and password.' })

  const approvedRoles = ['secretary', 'parent', 'teacher', 'supply']

  if(!approvedRoles.includes(role)) return res.status(400).json({ message: 'Unauthorized role.' })

  //We have an approved role here, get the correct schema
  
  let user = null
  if (role === 'secretary') user = await Secretary.findOne({ account }).populate('school')
  if (role === 'parent') user = await Parent.findOne({ account })
  if (role === 'teacher') {
    user = await Teacher.findOne({ account })
    if (!user) {
      user = await SupplyTeacher.findOne({ account })
    }
  }


 
  if(!user) return res.status(400).json({ message: 'Invalid credentials' })

  //check password ---If was public app we would hash password
  if (user.password !== password ) return res.status(400).json({ message: 'Invalid credentialsdsfdsf.' })

  //Everything good, send token

  const payload = {
    _id: user._id,
    role: user.role,
    name: user.name
  }

  const token = await jwt.sign(payload, jwt_secret)

  
  user.set('password', null)
 
  res.json({ token, role: user.role, name: user.name, _id: user._id, account: user.account, user })

}

exports.loggedInUserController = async (req, res) => {
 // If you are here, you have the user

  res.json(req.user)
}

