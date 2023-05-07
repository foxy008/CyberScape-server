const NewsAPI = require('newsapi')
const newsapi = new NewsAPI("a46249efc4984d83b05016fb1c6118f5");

class newsController {
    static async getNFTNews(req, res, next) {
        try {
            const news = await newsapi.v2.everything({
                q: "NFT",
                from: "2022-26-05",
                sortBy: "popularity"
            })

            res.status(200).json(news)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = newsController