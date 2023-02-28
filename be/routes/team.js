const express = require("express");
const router = express.Router();
const Team = require("../models/TeamSchema");
const verifyToken = require("../middlewares/verifyToken");

require("dotenv").config();

router.post("/", verifyToken, async (req, res) => {
  console.log(res.locals.user);
  const { teamName } = req.body;
  const newTeam = new Team({
    name: teamName,
    events: [],
  });
  const team = await newTeam.save();
  const user = await User.findById(res.locals.user);
  user.admin.push(team._id);
  user.member.push({teamId: team._id,accepted: true});
  await user.save();

  res.sendStatus(200);
});

module.exports = router;
