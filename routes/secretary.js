const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authorize')

const { 
  getAttendancesToApprove, 
  markAttendance, 
  getCoursesAtSchool, 
  viewApproved, 
  editAttendance,
  getNotNotified,
  sendEmailToParent,
  getStudentRecord
} = require('../controllers/secretary')


//make sure token is in header
router.post('/secretary/attendance', authorize('secretary'), getAttendancesToApprove)
router.post('/secretary/approved', authorize('secretary'), markAttendance)
router.post('/secretary/courses', authorize('secretary'), getCoursesAtSchool)
router.post('/secretary/viewapproved', authorize('secretary'), viewApproved)
router.post('/secretary/edit', authorize('secretary'), editAttendance)
router.post('/secretary/notnotified', authorize('secretary'), getNotNotified)
router.post('/secretary/notifyparent', authorize('secretary'), sendEmailToParent)
router.post('/secretary/student', authorize('secretary'), getStudentRecord)

module.exports = router