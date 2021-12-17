const express = require('express')

const authorize = require('../middlewares/authorize')

const {
  getStudentAttendanceForDay,
  getStudentAttendance,
  notifyByParent,
  getCourseAttendance,
  markAttendance
} = require('../controllers/attendance')
const router = express.Router()

//making it a post just so can send the date in body using axios
router.post('/attendance/:studentId', authorize('parent'), getStudentAttendanceForDay)
router.get('/attendance/:studentId', authorize('parent'), getStudentAttendance)
router.post('/attendance/:id/student', authorize('parent'), notifyByParent)

router.post('/attendance/course/:id', authorize('teacher'), getCourseAttendance )
router.post('/marked', authorize('teacher'),  markAttendance)

module.exports = router