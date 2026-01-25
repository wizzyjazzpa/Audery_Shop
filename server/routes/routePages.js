const express  = require('express');
const router = express.Router();
const controlPages = require('../controller/control_pages');
const admin_jwt_token = require('../middleware/admin_token');

router.get('/',controlPages.home);
router.get('/about',controlPages.about);
router.get('/contact',controlPages.contact);
router.get('/product',controlPages.singleProduct);

//Admin

router.get('/createAdmin',controlPages.createAdmin);
router.get('/admin',controlPages.Admin);
router.get('/lockscreen',controlPages.lockScreen);
router.get('/Dashboard',admin_jwt_token,controlPages.adminDashboard);
router.get('/productUpload',admin_jwt_token,controlPages.uploadProducts);
router.get('/viewproducts',admin_jwt_token,controlPages.viewProducts);
router.get('/editproducts',admin_jwt_token,controlPages.edit_single_product);
router.get('/logout',controlPages.logout)
module.exports = router;