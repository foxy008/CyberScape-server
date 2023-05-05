const express = require('express');
const userFavoritesController = require('../controllers/userFavoritesController');
const router = express.Router();

router.post('/:id', userFavoritesController.postNewRating);
router.patch('/:id', userFavoritesController.patchExistingRating);

module.exports = router;
