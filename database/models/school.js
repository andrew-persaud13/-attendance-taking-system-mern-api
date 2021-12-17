const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schoolSchema = new Schema({
  name: { type: String, required: true },
  secretary: { type: Schema.Types.ObjectId, ref: 'Secretary' }
})


module.exports = mongoose.model('School', schoolSchema)