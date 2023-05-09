const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const author = require('../middlewares/author');
const verify = require('../middlewares/verify');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', auth, usersController.getProfile);
router.patch('/add', auth, author, usersController.addQuota);
router.patch('/reduce', auth, author, usersController.reduceQuota);
router.patch('/', auth, verify, usersController.updateVerified);
router.get('/payment', auth, usersController.getToken)

module.exports = router;
