const express  = require('express');
const router = express.Router();
const controlPages = require('../controller/control_pages');

router.get('/',controlPages.home);

module.exports = router;