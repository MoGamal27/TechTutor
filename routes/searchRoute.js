const express = require('express');
const { advancedSearch } = require('../controllers/searchController');
const router = express.Router();

router.get('/api/search', advancedSearch);

module.exports = router;
