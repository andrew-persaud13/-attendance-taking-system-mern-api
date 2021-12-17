/*
  This format to populate the database was inspired by Software Engineer Filip Jerga
*/

const { parents, students, teachers, courses, secretaries, schools, attendances } = require('./data')

const Student = require('../database/models/student')
const Parent = require('../database/models/parent')
const Course = require('../database/models/course')
const Teacher = require('../database/models/teacher')
const Secretary = require('../database/models/secretary')
const School = require('../database/models/school')
const Attendance = require('../database/models/attendance')

class SchoolDB {

  async clean() {
    await Student.deleteMany({});
    await Parent.deleteMany({})
    await Course.deleteMany({})
    await Teacher.deleteMany({})
    await Secretary.deleteMany({})
    await School.deleteMany({})
    await Attendance.deleteMany({})
  }

  async addData() {
    await Student.create(students);
    await Parent.create(parents)
    await Course.create(courses)
    await Teacher.create(teachers)
    await Secretary.create(secretaries)
    await School.create(schools)
    await Attendance.create(attendances)
  }

  async populate() {
    await this.clean();
    await this.addData();
  } 
}

module.exports = SchoolDB;

