const express = require('express');
const router = express.Router();
const videoController = require('../controllers/GetVideoController');
const searchVideoController = require('../controllers/SearchVideoController');

// Define the paginated fetch route
router.get('/', videoController.getPaginatedVideos);

// Define the search route
router.get('/search', searchVideoController.searchVideos);

module.exports = router;

module.exports = router;