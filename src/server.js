const app = require("./app")
const mongoose = require("mongoose")

/**
 * Connect to mongoose
 */

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected")
})

mongoose.connection.on("error", errMsg => {
  console.log("Error connecting database. Msg: " + errMsg)
})

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port)
})
