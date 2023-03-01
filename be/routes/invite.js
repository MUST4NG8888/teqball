const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const verifyToken = require("../middlewares/verifyToken")

router.post("/",verifyToken, async (req, res) => {
    const {id,userEmail} = req.body;
    console.log(id,userEmail)
   const user = await User.findOne({ email: userEmail })

   if(!user)  return res.status(400).json("Illl")

   const teamIds = user.member.map(member => member.teamId)
    if(teamIds.includes(id))  return res.status(402).json("Illl")

   const updateUser = await User.findByIdAndUpdate(user._id, {$push: {member: {teamId: id, admin: false, accepted: false}}}, {new: true})
    console.log(updateUser)
    return res.status(200).json("User invited")
})

module.exports = router