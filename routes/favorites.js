const express = require('express');
const ratingsController = require('../controllers/ratingsControllers');
const router = express.Router();

router.post(ratingsController.postNewFavorite);
router.delete(ratingsController.deleteExistingFavorite);

module.exports = router;
