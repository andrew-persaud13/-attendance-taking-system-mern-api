const Student = require('../database/models/student')

exports.addStudent = async (req, res) => {

  const student = await new Student(req.body).save()

  res.json(student)
}