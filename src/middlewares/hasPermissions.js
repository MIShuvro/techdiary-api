const User = require("../api/v1/User/model")

const hasPermissions = permissionNeeded => {
  return async function(req, res, next) {
    let hasEnoughPermission = true
    let { permissions: userPermissions } = await User.findById({
      _id: req.user._id
    }).select("+permissions")

    permissionNeeded.forEach(p => {
      if (!userPermissions.includes(p)) {
        hasEnoughPermission = false
      }
    })

    if (!hasEnoughPermission) {
      throw new Error("Insufficient Permission")
    } else next()
  }
}

module.exports = hasPermissions
