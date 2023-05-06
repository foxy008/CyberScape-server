const express = require('express');
const auth = require('../middlewares/auth');
const userFavoritesController = require('../controllers/userFavoritesController');
const router = express.Router();

router.use(auth);
router.post('/:id', userFavoritesController.postNewFavorite);
router.delete('/:id', userFavoritesController.deleteExistingFavorite);

module.exports = router;
