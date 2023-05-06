const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', auth, usersController.getProfile);

module.exports = router;
