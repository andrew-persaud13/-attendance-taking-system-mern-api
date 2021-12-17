const mongoose = require('mongoose')

const { Schema } = mongoose

const studentSchema = new Schema({
  name: { type: String, required: true },
  account: { type: String, required:true, maxlength: 10 },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  grade: { type: Number, required: true, min: 9, max: 12},  //grade is what grade they are in, not marks
  attendance: { type: Schema.Types.ObjectId, ref: 'Attendance' },
  school: { type: Schema.Types.ObjectId, ref: 'School'  }  
})



module.exports = mongoose.model('Student', studentSchema)