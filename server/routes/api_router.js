const express = require('express');
const router = express.Router();
 const api_controller = require('../controller/api_controller');
 const upload = require('../middleware/upload');




router.post('/createAdmin',api_controller.createAdmin);
router.post('/authAdminLogin',api_controller.auth_login);
router.post('/uploadProducts',upload.single("image"), api_controller.uploadProducts);
router.post('/editProduct',upload.single("image"),api_controller.editProduct)
router.post('/deleteProduct',api_controller.deleteProduct);
router.post('/bigBanner_upload',upload.single("image"),api_controller.bigBannerUpload)

module.exports = router;