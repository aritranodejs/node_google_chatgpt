// routes/admin/api.js
const express = require('express');
const router = express.Router();
const chatgptController = require('../../controllers/user/chatgptController');
const googleController = require('../../controllers/user/googleController');

router.get('/chatgpt-search', chatgptController.generateCompletion);
router.get('/google-search', googleController.search);

module.exports = router;
