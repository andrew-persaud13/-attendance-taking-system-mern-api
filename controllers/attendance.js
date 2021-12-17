const moment = require('moment')

const Attendance = require('../database/models/attendance')

exports.getStudentAttendanceForDay = async (req, res) => {

  const { studentId } = req.params
  const { date } = req.body
  const dateTransformed = moment(date).startOf('day')

  const attendances = await Attendance.find({ student: studentId, day : {
    $gte: dateTransformed.toDate(),
    $lte: moment(dateTransformed).endOf('day').toDate()
  } }).populate({
    path: 'student',
    populate: {
      path: 'school'
    }
  }).populate({
    path: 'course',
    populate: {
      path: 'school'
    },
    populate: {
      path: 'instructor'
    }
  })
  

  res.json({ attendances })
}

exports.getStudentAttendance = async (req, res) => {

  const { studentId } = req.params
  const attendances = await Attendance.find({ student: studentId }).populate('student').populate('course')
  res.json({ attendances })
}

exports.notifyByParent = async (req, res) => {

  const { id } = req.params
  const { status} = req.body

  await Attendance.update({ _id: id }, {status, notified: true, secretaryApproved: true}, { new: true })


  res.json({ message : 'Attendance updated. Thanks' })
}

exports.getCourseAttendance = async (req, res) => {

  const { day } = req.body
  const { id } = req.params

  const dateTransformed = moment(day).startOf('day')

  const attendance = await Attendance.find({ course: id, day : {
    $gte: dateTransformed.toDate(),
    $lte: moment(dateTransformed).endOf('day').toDate()
  } }).populate({
    path: 'student',
    populate: {
      path: 'school'
    }
  }).populate('course')

  res.json({ attendance })

}

exports.markAttendance =  (req, res) => {

  const {attendances} = req.body

  attendances.forEach(async (attendance) => await Attendance.update({ _id: attendance._id }, { ...attendance, markedByTeacher: true }, { new : true}))



  res.json({ message: 'Success.' })
}