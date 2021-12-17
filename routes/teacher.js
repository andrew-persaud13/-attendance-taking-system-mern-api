const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const { getCourses, getCourse } = require('../controllers/teacher')


//make sure token is in header
router.get('/teacher/courses', authorize('teacher'), getCourses)
router.get('/teacher/course/:id', authorize('teacher'), getCourse)


module.exports = router