const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./users');
const NFTsRouter = require('./users');
const ratingsRouter = require('./users');
const userFavoritesRouter = require('./users');
const roomNFTsRouter = express.Router();

router.use('/users', usersRouter);
router.use('/rooms', roomsRouter);
router.use('/NFTs', NFTsRouter);
router.use('/ratings', ratingsRouter);
router.use('/favorites', userFavoritesRouter);
router.use('/room-nfts', roomNFTsRouter);

module.exports = router;
