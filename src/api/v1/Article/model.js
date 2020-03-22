const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const { isURL } = require("validator")
const shortId = require("shortid")

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: [6, "Title should be atleast 6 characters long"]
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Slug mustbe unique"]
    },
    excerpt: {
      type: String,
      trim: true
    },
    body: {
      type: String,
      trim: true,
      required: [true, "Article body is required"],
      minlength: [120, "Article body should be atleast 120 characters long"]
    },
    featureImage: {
      type: String,
      trim: true,
      validate: [isURL, "Please provide a valid url"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author id is required"]
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
)

const slug = str => {
  return (
    str
      .toLowerCase()
      .split(" ")
      .join("-") +
    "--" +
    shortId.generate()
  )
}

articleSchema.pre("save", function(next) {
  this.slug = slug(this.title)
  next()
})

articleSchema.pre(/^find/, function(next) {
  this.populate("author").populate("categories")
  next()
})

articleSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." })

module.exports = mongoose.model("Article", articleSchema)
