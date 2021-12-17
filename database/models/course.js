const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  period: { type: Number, required: true },
  endTime: { type: Date, required: true },
  startTime: { type: Date, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  instructor: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  grade: { type: Number, required: true},
  school: { type: Schema.Types.ObjectId, ref: 'School', required: true }

}, { timestamps: true })



module.exports = mongoose.model('Course', courseSchema)