const mongoose = require('mongoose')
const path = require('path')
const { MONGOOSE_KEY } = require('../config')

const makeMongooseHappy = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const p = path.join(__dirname, 'models')


require('./models/course')
require('./models/school')

module.exports = connectDB = () => {
  mongoose.connect(MONGOOSE_KEY, makeMongooseHappy, (err) => {
    if(err) process.exit(1)

    console.log('Database is up.');
  })
}

