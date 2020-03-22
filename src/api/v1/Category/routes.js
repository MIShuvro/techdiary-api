const Router = require("express").Router()
const { index, show, update, destroy, store } = require("./controllers")

const isAuthenticated = require("../../../middlewares/isAuthenticated")
const hasPermissions = require("../../../middlewares/hasPermissions")

Router.get("/", index)
// Router.get("/:slug", show)

// Router.put("/:slug", hasPermissions(["UPDATE_ARTICLE"]), update)
Router.post("/", isAuthenticated, hasPermissions(["CREATE_CATEGORY"]), store)
// Router.delete("/:slug", hasPermissions(["DELETE_ARTICLE"]), destroy)

module.exports = Router
