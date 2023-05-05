const express = require('express');
const NFTsController = require('../controllers/NFTsController');
const router = express.Router();

router.post('/', NFTsController.postNewNFTs);

module.exports = router;
