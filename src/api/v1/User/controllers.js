const { compareSync } = require("bcryptjs")
const joi = require("@hapi/joi")
const jwt = require("jsonwebtoken")
const User = require("./model")
const Token = require("../Token/model")

const userDefaultPermissions = require("./PERMISSIONS").userDefaultPermissions

module.exports.register = async (req, res) => {
  let {
    name,
    username,
    password,
    profilePhoto,
    email,
    confirmPassword
  } = req.body

  let user = await User.create({
    name,
    username,
    password,
    confirmPassword,
    profilePhoto,
    email,
    permissions: userDefaultPermissions
  })

  res.json(user)
}

module.exports.login = async (req, res) => {
  let { user, password } = req.body

  let fetchedUser = await User.findOne({
    $or: [{ username: user.toLowerCase() }, { email: user.toLowerCase() }]
  }).select("+password")

  // User not found
  if (!fetchedUser)
    return res.status(401).json({
      message: "Invalid credentials"
    })

  // match password
  const matched = compareSync(password, fetchedUser.password)

  if (!matched)
    return res.status(401).json({
      message: "Invalid credentials"
    })

  if (matched) {
    let token = jwt.sign({ _id: fetchedUser._id }, process.env.JWT_SECRET)

    Token.create({
      sub: fetchedUser._id,
      token,
      platform: `${req.useragent.os} | ${req.useragent.platform}`
    })

    return res.json({
      message: "You have successfully loggedin",
      user: fetchedUser,
      token
    })
  }
}

module.exports.logout = async (req, res) => {
  let loggedout = await Token.findOneAndDelete({ sub: req.user._id })

  if (loggedout)
    res.json({
      message: "You have successfully logged out"
    })
}

module.exports.mySessions = async (req, res) => {
  let sessions = await Token.find({
    sub: req.user._id
  })

  const active = req.headers.authorization.replace("Bearer ", "")

  const dd = sessions
    .map(({ _doc }) => {
      _doc.active = _doc.token === active
      return _doc
    })
    .sort((x, y) => (x.active === y.active ? 0 : x.active ? -1 : 1))

  res.json({
    sessions: dd
  })
}

module.exports.removeSession = async (req, res) => {
  let tokenRemoved = await Token.findOneAndRemove({
    sub: req.user._id,
    _id: req.params.sessionId
  })

  if (tokenRemoved)
    res.json({
      message: "Session removed"
    })
  else {
    res.json({
      message: "Session is not found or already removed"
    })
  }
}

module.exports.removeSessions = async (req, res) => {
  const active = req.headers.authorization.replace("Bearer ", "")

  await Token.deleteMany({
    sub: req.user._id,
    token: { $ne: active }
  })

  res.json({
    message: "All other sessions removed"
  })
}
