const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const { getChildren } = require('../controllers/parent')


//make sure token is in header
router.get('/parent/children', authorize('parent'), getChildren)



module.exports = router