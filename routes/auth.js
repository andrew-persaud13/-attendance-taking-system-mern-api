const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const {  
  loginController,
  loggedInUserController
} = require('../controllers/auth')

router.post('/login', loginController)
router.post('/me/:role', authorize(), loggedInUserController)


module.exports = router