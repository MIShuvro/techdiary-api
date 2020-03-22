const Article = require("./model")

module.exports.index = async (req, res) => {
  let articles = await Article.find()
  res.json(articles)
} // article list
module.exports.show = (req, res) => {
  res.json({
    message: "show"
  })
} // show a single article
module.exports.update = (req, res) => {
  res.json({
    message: "update"
  })
} // update a single article
module.exports.store = async (req, res) => {
  const { title, slug, body, excerpt, featureImage, categories } = req.body
  let article = await Article.create({
    title,
    slug,
    body,
    excerpt,
    featureImage,
    categories,
    author: req.user._id
  })
  res.json(article)
} // create a single article
module.exports.destroy = (req, res) => {
  res.json({
    message: "destroy"
  })
} // delete a single article
