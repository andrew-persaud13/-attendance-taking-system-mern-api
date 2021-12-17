const Teacher = require('../database/models/teacher')
const Course = require('../database/models/course')
const Students = require('../database/models/school')
const SupplyTeacher = require('../database/models/supplyTeacher')

exports.getCourses = async (req, res) => {
  let teacher = await Teacher.findOne({ _id: req.user._id }).populate({
    path: 'courses',
    populate: { path: 'school' }
  })

  if(!teacher) {
    teacher = await SupplyTeacher.findOne({ _id: req.user._id }).populate({
      path: 'courses',
      populate: { path: 'school' }
    })
  }
  
  
  res.json({ teacher })
}

exports.getCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('school').populate('students')

 
  res.json({ course })
}