const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [6, "Name should be atleast 6 characters long"]
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Slug mustbe unique"]
    }
  },
  { timestamps: true }
)

categorySchema.plugin(uniqueValidator, { message: "{PATH} must be unique." })

module.exports = mongoose.model("Category", categorySchema)
