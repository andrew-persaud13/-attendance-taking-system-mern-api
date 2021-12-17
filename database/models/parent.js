const mongoose = require('mongoose')

const { Schema } = mongoose

const parentSchema = new Schema({
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
    default: 'parent'
  },
  children: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  email: { type: String, required:true }

}, { timestamps: true })



module.exports = mongoose.model('Parent', parentSchema)