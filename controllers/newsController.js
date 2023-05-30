const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

class newsController {
  static async getNFTNews(req, res, next) {
    try {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const formattedDate = date.toISOString().split("T")[0];

      const news = await newsapi.v2.everything({
        q: "NFT",
        from: formattedDate,
        sortBy: "popularity",
        language: "en",
        pageSize: 100,
      });

      res.status(200).json(news);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = newsController;
