const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/placeController');

router.get('/search/:city', PlaceController.search);

module.exports = router;
