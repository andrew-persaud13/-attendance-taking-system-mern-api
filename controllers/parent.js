const Parent = require('../database/models/parent')

exports.getChildren = async (req, res) => {
  const user = req.user
  const parent = await Parent.findOne({ _id: user._id }).populate({
    path: 'children',
    populate: { path: 'school' }
  })
  res.json({children: parent.children})
}