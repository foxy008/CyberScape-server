const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./rooms');
const newsRouter = require("./news")
const NFTsRouter = require('./nfts');
const ratingsRouter = require('./ratings');
const userFavoritesRouter = require('./favorites');

router.use('/users', usersRouter);
router.use('/rooms', roomsRouter);
router.use("/nft-news", newsRouter)
router.use('/nfts', NFTsRouter);
router.use('/ratings', ratingsRouter);
router.use('/favorites', userFavoritesRouter);

module.exports = router;
