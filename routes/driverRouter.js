const express = require('express');
const DC = require('../controllers/DriverController');

const router = express.Router();

// user interactions
router.get('/', DC.getAllProfiles);
router.get('/:id', DC.getProfile);

module.exports = router;