const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const schedule = require('node-schedule');
const SupplyTeacher = require('./database/models/supplyTeacher')
const moment = require('moment');
const { remove } = require('./database/models/supplyTeacher');

const PORT = 3001

//third party middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//mongoose
require('./database')()

//register routes
app.use('/group7', require('./routes/auth'))
app.use('/group7', require('./routes/student'))
app.use('/group7', require('./routes/parent'))
app.use('/group7', require('./routes/teacher'))
app.use('/group7', require('./routes/attendance'))
app.use('/group7', require('./routes/secretary'))
app.use('/group7', require('./routes/supplyTeacher'))



//Test routes
app.use('/group7', require('./routes/test_routes/dates'))

//Hello World route
app.get('/group7', (req, res) => {
  res.json('Group 7')
})



const removeSupplyTeachers = async () => {
  await SupplyTeacher.deleteMany({})
}

//run schedulers
schedule.scheduleJob('*/5 * * * * *', removeSupplyTeachers)


//run server
app.listen(PORT, () => console.log(`School management API is running on port ${PORT}`))



