require("dotenv").config()

const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require("morgan")("dev"))

app.get("/", (req, res) => {
  res.json({
    message: "Application is running"
  })
})

app.use("/v1", require("./api/v1/bootstrap"))

app.use(require("./utils/handleErrors"))

module.exports = app