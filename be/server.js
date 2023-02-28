const express = require("express")
const app = express()
const port = 3000
const colors = require("colors")
const cors = require("cors")
const connectDB = require("./database")
require("dotenv").config()

const loginRoute = require("./routes/login")
const teamRoute = require("./routes/team")

app.use(cors())
app.use(express.json())

app.use("/api/login", loginRoute)
app.use("/api/team", teamRoute)

const init = async () => {
  const isConnected = await connectDB()
  if (isConnected) app.listen(port, () => console.log(`Example app listening on port ${port}!`.cyan))
}

init()