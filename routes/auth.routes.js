const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const AuthController = require('../controllers/auth.controller');
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar'), AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/user', authMiddleware, AuthController.getUser);

module.exports = router;