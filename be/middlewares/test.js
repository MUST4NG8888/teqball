const axios = require("axios");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_KEY = process.env.API_KEY;
const CALENDAR_ID =
  "f0ba60e0bdd9666c808d8581c1c73c8bd71f42563863811b2d909a30a6406492@group.calendar.google.com"; //'primary';

axios
  .get(
    `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
    {
      params: {
        key: API_KEY,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
