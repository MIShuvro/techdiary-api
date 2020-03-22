const formatMongooseValidationError = require("./formatMongooseValidationErrors")

// const formatJoiError = errors => {
//   const errorObj = {}

//   errors.forEach(n => {
//     errorObj[n.path[0]] = n.message
//   })

//   return errorObj
// }

const handleErrors = (error, req, res, next) => {
  if (error.name == "ValidationError") {
    return res.status(401).json(formatMongooseValidationError(error.errors))
  }

  if (process.env.NODE_ENV === "development") {
    res.status(501).json({
      type: error.name,
      message: error.message,
      stackTrace: error.stack
    })
  } else {
    res.status(500).json({
      type: error.name,
      message: "Internal server Error"
    })
  }
}

module.exports = handleErrors
