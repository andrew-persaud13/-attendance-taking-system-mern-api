const mongoose = require('mongoose')

const { Schema } = mongoose

const dateSchema = new Schema({
  dates: [Date]
}, { timestamps: true })


module.exports = mongoose.model('DatesTest', dateSchema)