const express = require('express');
const ratingsController = require('../controllers/ratingsControllers');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth());
router.post('/:id', ratingsController.postNewRating);
router.patch('/:id', ratingsController.patchExistingRating);

module.exports = router;
