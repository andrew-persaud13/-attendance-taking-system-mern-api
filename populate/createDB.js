const mongoose = require('mongoose');
const { MONGOOSE_KEY  } = require('../config')

const SchoolDB = require('./schoolDB');

mongoose.connect(MONGOOSE_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, async () => {
  const schoolDB = new SchoolDB();
  console.log('Starting population of DB');
  await schoolDB.populate();
  await mongoose.connection.close();
  console.log('SchoolDB has been populated!');
});