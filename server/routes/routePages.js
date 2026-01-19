const express  = require('express');
const router = express.Router();
const controlPages = require('../controller/control_pages');

router.get('/',controlPages.home);
router.get('/about',controlPages.about);
router.get('/contact',controlPages.contact);
router.get('/product',controlPages.singleProduct);
module.exports = router;