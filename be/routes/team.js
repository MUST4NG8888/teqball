const express = require("express")
const router = express.Router()
const Team = require("../models/TeamSchema")
const User = require("../models/UserSchema")
const verifyToken = require("../middlewares/verifyToken")
require("dotenv").config()

router.get("/", verifyToken, async (req, res) => {
  const userId = res.locals.user
  const user = await User.findById(userId)
  const memberIds = user.member.map(m => m.teamId)
  const teams = await Team.find({ _id: { $in: memberIds } })
  const combinedData = user.member.map(member => {
    const team = teams.find(x => x._id == member.teamId)
    return { member, name: team.name, events: team.events.length }
  })
  res.json(combinedData)
})

router.post("/", verifyToken, async (req, res) => {
  const { teamName } = req.body
  const newTeam = new Team({ name: teamName, events: [] })
  const team = await newTeam.save()
  const user = await User.findByIdAndUpdate(res.locals.user, {$push: {member: {teamId: team._id, admin: true, accepted: true}}}, {new: true})
  res.sendStatus(200)
})

module.exports = router
