const express = require('express');
const ratingsController = require('../controllers/ratingsControllers');
const router = express.Router();

router.post('/:id', ratingsController.postNewRating);
router.patch('/:id', ratingsController.patchExistingRating);

module.exports = router;
