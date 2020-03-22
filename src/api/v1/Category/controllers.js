const Category = require("./model")

module.exports.index = async (req, res) => {
  let categories = await Category.find()
  res.json(categories)
}

module.exports.store = async (req, res) => {
  let { name, slug } = req.body
  let category = await Category.create({
    name,
    slug
  })
  res.json(category)
}
