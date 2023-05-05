const express = require('express');
const roomsController = require('../controllers/roomsController');
const router = express.Router();

router.get('/', roomsController.getAllRooms);
router.get('/:id', roomsController.getRoomById);
router.get('/top', roomsController.getTopCollection);

module.exports = router;
