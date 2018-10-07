const express = require('express');
const UC = require('../controllers/UserController');

const router = express.Router();

// user interactions
router.get('/', UC.getAllProfiles);
router.get('/search', UC.searchUser);
router.get('/me', UC.getOwnProfile);
router.get('/:id', UC.getProfile);
router.patch('/:id', UC.updateProfile);

module.exports = router;