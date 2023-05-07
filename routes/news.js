const express = require("express");
const newsController = require("../controllers/newsController");
// const auth = require("../middlewares/auth")
const router = express.Router();

router.get("/", newsController.getNFTNews);

module.exports = router;
