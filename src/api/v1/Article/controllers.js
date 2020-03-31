const Article = require("./model")

module.exports.index = async (req, res) => {
  let articles = await Article.find()
  res.json(articles)
} // article list
module.exports.show = async (req, res) => {
  const findArticle = await Article.findOne({
    slug: req.params.slug
  })


  if (!findArticle) {
    return res.status(404).json({
      msg: 'Article Not Found or Deleted.'
    })
  }
  if (findArticle) {
    res.status(200).json({
      article: findArticle
    })
  }
} // show a single article
module.exports.update = async (req, res) => {
  const article = await Article.findOneAndUpdate({
    slug: req.params.slug
  }, {
    $set: req.body,
  }, {
    new: true
  })

  res.json({
    article,
    msg: 'Article updated successfull'
  })
} // update a single article
module.exports.store = async (req, res) => {
  const {
    title,
    slug,
    body,
    excerpt,
    featureImage,
    categories
  } = req.body
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
module.exports.destroy = async (req, res) => {
  const article = await Article.deleteOne({
    slug: req.params.slug
  })
  if (!article.n) {
    return res.json({
      msg: 'Article already deleted or not found.'
    })
  }
  res.json({
    msg: 'Article deleted successfull'
  })
} // delete a single article