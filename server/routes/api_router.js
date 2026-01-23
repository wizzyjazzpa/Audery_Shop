const express = require('express');
const router = express.Router();
 const api_controller = require('../controller/api_controller');
 const upload = require('../middleware/upload');




router.post('/createAdmin',api_controller.createAdmin);
router.post('/authAdminLogin',api_controller.auth_login);
router.post('/uploadProducts',upload.single("image"), api_controller.uploadProducts);

module.exports = router;