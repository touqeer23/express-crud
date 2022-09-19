const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const multer  = require('multer')
const uploader = multer();
const fileUploads = uploader.fields([{ name: 'user_profile', maxCount: 1 }, { name: 'files', maxCount: 4 }])


router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/uploads', fileUploads, userController.uploadFiles);

module.exports = router;
