const Router = require("express").Router()
const { index, show, update, destroy, store } = require("./controllers")

const isAuthenticated = require("../../../middlewares/isAuthenticated")
const hasPermissions = require("../../../middlewares/hasPermissions")

const isMine=require('../../../middlewares/isMine')

Router.get("/", index)
Router.get("/:slug", show)

Router.patch("/:slug", isAuthenticated, hasPermissions(["UPDATE_ARTICLE"]),isMine(), update)
Router.post("/", isAuthenticated, hasPermissions(["CREATE_ARTICLE"]), store)
Router.delete("/:slug", isAuthenticated, hasPermissions(["DELETE_ARTICLE"]), isMine(), destroy)

module.exports = Router
