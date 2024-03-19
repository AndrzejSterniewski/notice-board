const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');

const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', AdController.getAll);

router.get('/ads/:id', AdController.getById);

router.get('/ads/:searchPhrase', AdController.getByPhrase);

router.post('/ads', authMiddleware, imageUpload.single('picture'), AdController.postAd);

router.patch('/ads/:id', authMiddleware, AdController.patchAd);

router.delete('/ads/:id', authMiddleware, AdController.deleteAd);

module.exports = router;