const Category = require("./model")

module.exports.index = async (req, res) => {
  let categories = await Category.find()
  res.json(categories)
}

module.exports.store = async (req, res) => {
  let {
    name,
    slug
  } = req.body
  let category = await Category.create({
    name,
    slug
  })
  res.json(category)
}

module.exports.show = async (req, res) => {
  const findCategory = await Category.findOne({
    slug: req.params.slug
  })


  if (!findCategory) {
    return res.status(404).json({
      msg: 'Category Not Found or Deleted.'
    })
  }
  if (findCategory) {
    res.status(200).json({
      Category: findCategory
    })
  }
}

module.exports.update = async (req, res) => {
  const category = await Category.findOneAndUpdate({
    slug: req.params.slug
  }, {
    $set: req.body,
  }, {
    new: true
  })

  res.status(200).json({
    category,
    msg: 'Category updated successfull'
  })
}

module.exports.destroy = async (req, res) => {
  const category = await Category.deleteOne({
    slug: req.params.slug
  })

  if (!category.n) {
    return res.json({
      msg: 'Category already deleted or not found.'
    })
  }
  res.json({
    msg: 'Category deleted successfull'
  })
}