const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const { register } = require('../controllers/supplyTeacher')


//make sure token is in header
router.post('/supply/register', authorize('secretary'), register)



module.exports = router