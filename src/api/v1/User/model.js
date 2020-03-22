const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const { isEmail, isURL, isAlphanumeric } = require("validator")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name should be atleast 3 characters long"]
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Username should be atleast 3 characters long"],
    unique: [true, "Username is already taken"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
    minlength: [3, "Username should be atleast 3 characters long"],
    unique: [true, "Email is already taken"],
    validate: [isEmail, "Not a valid email address"]
  },
  profilePhoto: {
    type: String,
    trim: true,
    validate: [isURL, "Please provide a valid url"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minlength: [6, "Password should be atleast 6 characters long"],
    maxlength: [50, "Password can be atmost 50 characters long"],
    validate: [
      isAlphanumeric,
      "Only alphabet and numeric characters are supported in password"
    ]
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function(pass) {
        return pass === this.password
      },
      message: "password did not matched"
    }
  },
  permissions: {
    type: [String],
    enum: require("./PERMISSIONS").permissionsEnum,
    select: false
  }
})

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." })

UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hashSync(this.password, 12)

  // remove confirmPassword property before save
  this.confirmPassword = undefined

  next()
})

module.exports = mongoose.model("User", UserSchema)
