const SupplyTeacher = require('../database/models/supplyTeacher')
const Teacher = require('../database/models/teacher')

exports.register = async (req, res) => {
  const { courses, schools } = req.body
  const teacher = await Teacher.findOne({ schools: schools[0], courses : courses[0] })
  const supplyTeacher = await SupplyTeacher.findOne({  schools: schools[0], courses : courses[0] })

  if (teacher && supplyTeacher) return res.status(400).json({ message: 'A supply teacher has already been assigned.' })

  const st = await new SupplyTeacher(req.body).save()

  res.json({ message: 'Success' })
}