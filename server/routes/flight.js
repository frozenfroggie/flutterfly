const express = require('express');
const router = express.Router();
const FlightController = require('../controllers/flightController');

router.get('/inspirations', FlightController.inspirations)

router.get('/autocomplete/:term', FlightController.autocomplete)

router.get('/low-fare', FlightController.lowFareSearch)

module.exports = router;
