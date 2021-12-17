const express = require('express')

const router = express.Router()

const DatesTest = require('../../database/models/test_models/dates')

router.post('/datestest', async (req, res) => {

  const { date } = req.body
  const newDate = await new DatesTest({ dates: [date] }).save()

  res.json(newDate)

})

router.put('/datestest/:id', async (req, res) => {
  const date = await DatesTest.findOneAndUpdate({ _id: req.params.id }, { $push: { dates: req.body.date } }, { new: true })

  res.json(date)

})

module.exports = router


// PersonModel.update(
//   { _id: person._id }, 
//   { $push: { friends: friend } },
//   done
// );