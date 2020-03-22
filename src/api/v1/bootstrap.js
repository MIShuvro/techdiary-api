const Router = require("express").Router()

Router.use("/users", require("./User/routes"))
Router.use("/articles", require("./Article/routes"))
Router.use("/categories", require("./Category/routes"))

module.exports = Router
