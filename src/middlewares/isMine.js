const Article = require('../api/v1/Article/model')

const isMine = () => {
    return async function (req, res, next) {

        const article = await Article.findOne({
            slug: req.params.slug
        })

        if (!article) {
            return res.status(404).json({
                msg: "No document found with that slug"
            })
        }

        if (article.author._id == req.user._id) {

            req.article = article
            next()
        } else {
            res.status(403).json({
                msg: "Does not have access rights to the content"
            })
        }


    }
}

module.exports = isMine