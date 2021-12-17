const mongoose = require('mongoose')  //need to make Ids
const crypto = require('crypto')
const moment = require('moment')

const { names } = require('../firstNamesList')
//Starting world: 4 courses, 1 grade, 4 teachers, 6 students per course. 9 parents, 1 secretary, no supplies


const secretary = [
  {
    _id: mongoose.Types.ObjectId(),
    name: "Ronald Weasley",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Harry Potter',
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678"
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Hermione Granger',
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678"
  }
]

const schoolsArr = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Lassonde High School',
    secretary: secretary[0]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Hogwarts',
    secretary: secretary[1]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Xavier Institute',
    secretary: secretary[2]._id
  }
]

//update secretaries
secretary[0].school = schoolsArr[0]._id
secretary[1].school = schoolsArr[1]._id
secretary[2].school = schoolsArr[2]._id

/*
  All schoolsArr only have grade 12 for demo purposes and same courses
*/



let courseArr = [
  {
    _id: mongoose.Types.ObjectId(),
    name: "English",
    grade: 12,
    endTime: moment('2020-02-02 09:30'),
    startTime: moment('2020-02-02 08:30'),
    period: 1,
    students: [],
    school: schoolsArr[0]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Calculus",
    grade: 12,
    period: 2,
    endTime: moment('2020-02-02 11:30'),
    startTime: moment('2020-02-02 10:30'),
    students: [],
    school: schoolsArr[0]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Physics",
    grade: 12,
    period: 3,
    endTime: moment('2020-02-02 13:30'),
    startTime: moment('2020-02-02 12:30'),
    students: [],
    school: schoolsArr[0]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Requirements",
    grade: 12,
    period: 4,
    endTime: moment('2020-02-02 15:30'),
    startTime: moment('2020-02-02 14:30'),
    students: [],
    school: schoolsArr[0]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "English",
    grade: 12,
    endTime: moment('2020-02-02 09:30'),
    startTime: moment('2020-02-02 08:30'),
    period: 1,
    students: [],
    school: schoolsArr[1]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Calculus",
    grade: 12,
    period: 2,
    endTime: moment('2020-02-02 11:30'),
    startTime: moment('2020-02-02 10:30'),
    students: [],
    school: schoolsArr[1]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Physics",
    grade: 12,
    period: 3,
    endTime: moment('2020-02-02 13:30'),
    startTime: moment('2020-02-02 12:30'),
    students: [],
    school: schoolsArr[1]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Requirements",
    grade: 12,
    period: 4,
    endTime: moment('2020-02-02 15:30'),
    startTime: moment('2020-02-02 14:30'),
    students: [],
    school: schoolsArr[1]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "English",
    grade: 12,
    endTime: moment('2020-02-02 09:30'),
    startTime: moment('2020-02-02 08:30'),
    period: 1,
    students: [],
    school: schoolsArr[2]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Calculus",
    grade: 12,
    period: 2,
    endTime: moment('2020-02-02 11:30'),
    startTime: moment('2020-02-02 10:30'),
    students: [],
    school: schoolsArr[2]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Physics",
    grade: 12,
    period: 3,
    endTime: moment('2020-02-02 13:30'),
    startTime: moment('2020-02-02 12:30'),
    students: [],
    school: schoolsArr[2]._id
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Requirements",
    grade: 12,
    period: 4,
    endTime: moment('2020-02-02 15:30'),
    startTime: moment('2020-02-02 14:30'),
    students: [],
    school: schoolsArr[2]._id
  }
]


let teacherArr = [
  {
    _id: mongoose.Types.ObjectId(),
    name: "Albert Einstein",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
    courses: [courseArr[0]._id, courseArr[5]._id, courseArr[10]._id],
    schools: schoolsArr.map(school => school._id)
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Song Wang",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
    courses: [courseArr[1]._id, courseArr[6]._id, courseArr[11]._id],
    schools: schoolsArr.map(school => school._id)
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Patrick JMT",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
    courses: [courseArr[2]._id, courseArr[7]._id, courseArr[8]._id],
    schools: schoolsArr.map(school => school._id)
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: "Dumbledore",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
    courses: [courseArr[3]._id, courseArr[9]._id, courseArr[4]._id],
    schools: schoolsArr.map(school => school._id)
  }
]

//update course instructors
courseArr[0].instructor = teacherArr[0]._id
courseArr[5].instructor = teacherArr[0]._id
courseArr[10].instructor = teacherArr[0]._id
courseArr[1].instructor = teacherArr[1]._id
courseArr[6].instructor = teacherArr[1]._id
courseArr[11].instructor = teacherArr[1]._id
courseArr[2].instructor = teacherArr[2]._id
courseArr[7].instructor = teacherArr[2]._id
courseArr[8].instructor = teacherArr[2]._id
courseArr[3].instructor = teacherArr[3]._id
courseArr[9].instructor = teacherArr[3]._id
courseArr[4].instructor = teacherArr[3]._id


//Now need students in courses and parents for those students
//Let each course have 8 students


let studentArr = initArrayStudent(60)

let parentsArray = initArrayParent(20)

let count = 0
let i = 0
while(count < 60) {
  let index = count % 3 
  studentArr[i].school = schoolsArr[index]._id
  i = i + 1
  count = count + 1
}



//setup parents with students

let parentIndex = 0;
for (let i = 0; i < 60; i++) {
  parentIndex = i % 20
  parentsArray[parentIndex].children.push(studentArr[i]._id)
}


//Every student at a school goes to every course

//School 1
for (let i = 1; i < 60; i = i + 3) {
  let c = [courseArr[4]._id, courseArr[5]._id, courseArr[6]._id, courseArr[7]._id ]
  studentArr[i].courses = c
  courseArr[4].students.push(studentArr[i]._id)
  courseArr[5].students.push(studentArr[i]._id)
  courseArr[6].students.push(studentArr[i]._id)
  courseArr[7].students.push(studentArr[i]._id)
}

for (let i = 0; i < 60; i = i + 3) {
  let c = [courseArr[0]._id, courseArr[1]._id, courseArr[2]._id, courseArr[3]._id ]

  studentArr[i].courses.push(courseArr[0]._id)
  studentArr[i].courses.push(courseArr[1]._id)
  studentArr[i].courses.push(courseArr[2]._id)
  studentArr[i].courses.push(courseArr[3]._id)
  courseArr[0].students.push(studentArr[i]._id)
  courseArr[1].students.push(studentArr[i]._id)
  courseArr[2].students.push(studentArr[i]._id)
  courseArr[3].students.push(studentArr[i]._id)
}



for (let i = 2; i < 60; i = i + 3) {
  let c = [courseArr[8]._id, courseArr[9]._id, courseArr[10]._id, courseArr[11]._id ]
  studentArr[i].courses = c
  courseArr[8].students.push( studentArr[i]._id)
  courseArr[9].students.push(studentArr[i]._id)
  courseArr[10].students.push(studentArr[i]._id)
  courseArr[11].students.push(studentArr[i]._id)
}


//build up attendance for one student so it can be demoed




//give Lassonde a grade 9 class

const extraCourseLassonde = [
  {
    _id: mongoose.Types.ObjectId(),
    name: "General Studies",
    grade: 9,
    period: 1,
    endTime: moment('2020-02-02 09:30'),
    startTime: moment('2020-02-02 08:30'),
    students: [],
    school: schoolsArr[0]._id
  }
]
const extraTeachersLassonde = [
  {
    _id: mongoose.Types.ObjectId(),
    name: "Santa Claus",
    account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
    password: "12345678",
    courses: [extraCourseLassonde[0]._id],
    schools: [schoolsArr[0]._id]
  }
]

extraCourseLassonde[0].instructor = extraTeachersLassonde[0]._id

const extraStudentsLassonde = initArrayStudent2(10, 9,  extraCourseLassonde[0]._id, schoolsArr[0]._id)
const extraParentsLassonde = initArrayParent(2)
for (let i = 0; i < extraStudentsLassonde.length; i++) {
  parentIndex = i % 2
  extraParentsLassonde[parentIndex].children.push(extraStudentsLassonde[i]._id)
}

for (let i = 0; i < extraStudentsLassonde.length; i++) {
  extraCourseLassonde[0].students.push(extraStudentsLassonde[i]._id)
}


extraAttendanceItemLassonde = []

for (let i = 1; i <= 4; i++) {
  for (let j = 0; j < extraStudentsLassonde.length; j++) {
    let s = {}
    for (let k = 0; k < extraStudentsLassonde[j].courses.length; k++) {
      a = {
        day: moment(`2020-12-0${i}`),
        student: extraStudentsLassonde[j]._id,
        course: extraStudentsLassonde[j].courses[k],
        status: 'present',
        school: extraStudentsLassonde[j].school,
        secretaryApproved: true,
        markedByTeacher: true,
        grade:9
      }
      extraAttendanceItemLassonde.push(a)
    }
  }
}

for (let i = 7; i <= 11; i++) {
  for (let j = 0; j < extraStudentsLassonde.length; j++) {
    let s = {}
    for (let k = 0; k < extraStudentsLassonde[j].courses.length; k++) {
      a = {
        day: moment(`2020-12-${i < 10 ? '0' + i : i}`),
        student: extraStudentsLassonde[j]._id,
        course: extraStudentsLassonde[j].courses[k],
        status: 'notmarked',
        school: extraStudentsLassonde[j].school,
        grade: 9
      }
      extraAttendanceItemLassonde.push(a)
    }
  }
}




















function initArrayStudent2(n, grade, course, school) {
  let result = []
  for(let i = 0; i < n; i++) {
    const fName = names[Math.round(Math.random() * names.length)]
    const lName = names[Math.round(Math.random() * names.length)]
    let s = {
      _id: mongoose.Types.ObjectId(),
      account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
      name: `${fName} ${lName}`,
      grade,
      courses: [course],
      school,
    }
    result.push(s)
  }

  return result
}





function initArrayStudent(n) {
  let result = []
  for(let i = 0; i < n; i++) {
    const fName = names[Math.round(Math.random() * names.length)]
    const lName = names[Math.round(Math.random() * names.length)]
    let s = {
      _id: mongoose.Types.ObjectId(),
      account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
      name: `${fName} ${lName}`,
      grade: 12,
      courses: []
    }
    result.push(s)
  }

  return result
}


function initArrayParent(n) {
  let result = []
  for(let i = 0; i < n; i++) {
    const fName = names[Math.round(Math.random() * names.length)]
    const lName = names[Math.round(Math.random() * names.length)]
    let s = {
      _id: mongoose.Types.ObjectId(),
      account: `4312${crypto.randomBytes(32).toString('hex').slice(0, 6)}`,
      name: `${fName} ${lName}`,
      password: "12345678",
      children: [],
      email: 'andrew.persaud.dev@gmail.com'
    }
    result.push(s)
  }

  return result
}

const parent = parentsArray[0]
const studentId = parent.children[0]
const student = studentArr.find(s => s._id === studentId)


//just manually make an attendance for this guy

const attendanceArr = []


for (let i = 1; i <= 4; i++) {
  for (let j = 0; j < studentArr.length; j++) {
    let s = {}
    for (let k = 0; k < studentArr[j].courses.length; k++) {
      a = {
        day: moment(`2020-12-0${i}`),
        student: studentArr[j]._id,
        course: studentArr[j].courses[k]._id,
        status: 'present',
        school: studentArr[j].school._id,
        secretaryApproved: true,
        markedByTeacher: true,
        grade:12
      }
      attendanceArr.push(a)
    }
  }
}

for (let i = 7; i <= 11; i++) {
  for (let j = 0; j < studentArr.length; j++) {
    let s = {}
    for (let k = 0; k < studentArr[j].courses.length; k++) {
      a = {
        day: moment(`2020-12-${i < 10 ? '0' + i : i}`),
        student: studentArr[j]._id,
        course: studentArr[j].courses[k]._id,
        status: 'notmarked',
        school: studentArr[j].school._id,
        grade: 12
      }
      attendanceArr.push(a)
    }
  }
}


exports.attendances = [
  ...attendanceArr, ...extraAttendanceItemLassonde
]


exports.schools = [
  ...schoolsArr
]

exports.students = [
  ...studentArr, ...extraStudentsLassonde
]

exports.parents = [
  ...parentsArray, ...extraParentsLassonde
]

exports.courses = [
  ...courseArr, ...extraCourseLassonde
]

exports.teachers = [
  ...teacherArr, ...extraTeachersLassonde
]


exports.secretaries = [
  ...secretary
]

