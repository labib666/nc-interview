const express = require('express');
const DC = require('../controllers/DriverController');

const router = express.Router();

// user interactions
router.get('/', DC.getAllProfiles);
router.get('/search', DC.searchUser);
router.get('/me', DC.getOwnProfile);
router.get('/:id', DC.getProfile);
router.patch('/:id', DC.updateProfile);

module.exports = router;