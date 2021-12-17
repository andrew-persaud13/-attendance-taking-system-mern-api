const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const { addStudent } = require('../controllers/student')



router.post('/student', addStudent)



module.exports = router