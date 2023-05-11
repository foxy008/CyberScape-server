const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("c3c22837180048368ae3b712da2b1c11");

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
