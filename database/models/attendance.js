const mongoose = require('mongoose')

const { Schema } = mongoose

const attendanceSchema = new Schema({
 day: { type: Date, required: true },
 student: { type: Schema.Types.ObjectId, ref: 'Student' },
 course: { type: Schema.Types.ObjectId, ref: 'Course' },
 status: { type: String, enum: ['present', 'late', 'absent', 'notmarked'] },
 school: { type: Schema.Types.ObjectId, ref: 'School' },
 notified: { type: Boolean, default: false },
 secretaryApproved: { type: Boolean, default: false },
 markedByTeacher: { type: Boolean, default: false },
 emailed: { type: Boolean, default: false },
 grade : { type: Number, required: true }
}, { timestamps: true })



module.exports = mongoose.model('Attendance', attendanceSchema)