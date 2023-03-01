const express = require("express")
const router = express.Router()
const User = require("../models/UserSchema")
const verifyToken = require("../middlewares/verifyToken")

router.post("/join", verifyToken, async (req, res) => {
  const userId = res.locals.user
  const teamId = req.body.teamId
  const userTeams = await User.findById(userId).member
  const foundMember = await User.findOne({ member: {$elemMatch: {teamId: teamId}} })
  console.log(foundMember)
  res.status(200).json("ok")
})

module.exports = router