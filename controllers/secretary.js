const Attendance = require('../database/models/attendance')
const Course = require('../database/models/course')
const Parent = require('../database/models/parent')


const moment = require('moment')

const sendEmail = require('../email')


exports.getAttendancesToApprove = async (req, res) => {

  const { school, grade } = req.body

  const attendances = await Attendance.find({ school, markedByTeacher: true, secretaryApproved: false, grade }).populate({
    path: 'student',
    populate: {
      path: 'school'
    }
  }).populate({
    path: 'course',
    populate: {
      path: 'students'
    },
    populate: {
      path: 'instructor'
    }
  })
  
  const att = {}
  const crs = {}

  //init
  for (let attendance of attendances) {
    att[moment(attendance.day).format('yyyy/M/D')] = []
    crs[moment(attendance.day).format('yyyy/M/D')] = []
  }

  //need to structure the attendance items by date
  for (let attendance of attendances) {
    att[moment(attendance.day).format('yyyy/M/D')].push(attendance)
  }

 //Each array of attendance items has items for every course on that day. Need to filter out the unique courses and match them to that date
 // THE KEY IS THE DATE, VALUE IS AN ARRAY OF COURSES 
  for (let key in att) {
    att[key].reduce((acc, curr) => {
      if(addToSet(acc, curr.course._id )) {
        acc.push(curr.course._id)
        crs[key].push(curr.course)
      }
      return acc
    }, [])
  }

  res.json({ courses: crs, attendances: att })
}


exports.markAttendance =  (req, res) => {
  const {attendances} = req.body
  attendances.forEach(async (attendance) => await Attendance.update({ _id: attendance._id }, { ...attendance, secretaryApproved: true }, { new : true}))
  res.json({ message: 'Success' })
}


exports.getCoursesAtSchool = async (req, res) => {
  const { school, grade } = req.body
  const courses = await Course.find({ school , grade }).select('-students')
  console.log(courses);
  res.json({ courses })
}

exports.viewApproved = async (req, res) => {
  const { date, course } = req.body
  const dateTransformed = moment(date).startOf('day')
  const attendance = await Attendance.find({ 
    day: {
      $gte: dateTransformed.toDate(),
      $lte: moment(dateTransformed).endOf('day').toDate()
    },
    course,
    secretaryApproved: true  
  }).populate({
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
  })   //I don't know what data I'll need yet so just sending it all 

  res.json({ attendance })


}


exports.editAttendance =  (req, res) => {

  const {attendances} = req.body

  //will already by marked as approved and marked by teacher
  attendances.forEach(async (attendance) => await Attendance.update({ _id: attendance._id }, { ...attendance }, { new : true}))
  res.json({ message: 'Success.' })
}


exports.getNotNotified = async (req, res) => {
  const { course } = req.body

  const attendance = await Attendance.find({
    course,
    $or: [{ status: 'absent' }, { status: 'late' }],
    notified: false,
    emailed: false,
    secretaryApproved: true
  }).populate('student').populate('course')

  console.log(attendance);
  res.json({attendance})
}


exports.sendEmailToParent = async (req, res) => {

  const { attendance, status, student, course  } = req.body

  //Need the parents name and email
  const parent = await Parent.findOne({ children: student})

  //mark email field as true so it gets filtered out next time secretary searches
  const att = await Attendance.findOneAndUpdate({ _id: attendance }, { emailed: true }, { new: true }).populate('school')


  const subject = 'LSB School board Notification'
  const to = parent.email
  const text = `
    Dear ${parent.name}, this email is to notify you that 
    ${student.name} was ${status === 'late' ? 'late' : 'absent'}
    for ${course.name} on ${moment(att.day).format('MMM Do yyyy')} during
    period ${course.period} (${moment(course.startTime).format('HH:mm')} -- ${moment(course.endTime).format('HH:mm')})
    Sincerely, 
    ${att.school.name}
  `

  //Send Email
  
  await sendEmail({
    subject,
    to,
    text
  })


  res.json({ message: text })
}


exports.getStudentRecord = async (req, res) => {

  const { account, school } = req.body
  console.log(account);
  const attendances = await Attendance.find({secretaryApproved: true, school}).populate({
    path: 'student',
    populate: {
      path: 'school'
    }
  }).populate({
    path: 'course',
    populate: {
      path: 'instructor'
    }
  })

  const attendancesForStudent = attendances.filter(a => a.student.account === account)

  if(attendancesForStudent.length == 0) return res.status(400).json({ message: "User does not exist at this school." })

  res.json({ records: attendancesForStudent })

}

const addToSet= (arr, value) => {
  return !arr.includes(value)
}


//might need later
const compareDates = (date1, date2) => {
  return moment(date1).format('yyyy/M/D') === moment(date2).format('yyyy/M/D')
}