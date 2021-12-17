const mongoose = require('mongoose')

const { Schema } = mongoose

const secretarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
    maxlength: 10,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'secretary'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  }

}, { timestamps: true })



module.exports = mongoose.model('Secretary', secretarySchema)