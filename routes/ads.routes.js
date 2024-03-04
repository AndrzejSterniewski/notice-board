const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAll);

router.get('/ads/:id', AdController.getById);

router.post('/ads', AdController.postAd);

router.patch('/ads/:id', AdController.patchAd);

router.delete('/ads/:id', AdController.deleteAd);

module.exports = router;