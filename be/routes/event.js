const express = require("express");
const router = express.Router();
const Team = require("../models/TeamSchema");
const User = require("../models/UserSchema");
const Event = require("../models/EventSchema");
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config();

router.get("/", verifyToken, async (req, res) => {});

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const { event, id } = req.body;
  const newEvent = await Event.create(event);
  const team = await Team.findByIdAndUpdate(
    id,
    { $push: { events: newEvent._id } },
    { new: true }
  );
  const userId = res.locals.user;
  const user = await User.findById(userId);
  const API_KEY = process.env.API_KEY;
  const sendEventToCalendar = async () => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(event),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  };
  await sendEventToCalendar();
  res.sendStatus(200);
});

module.exports = router;
