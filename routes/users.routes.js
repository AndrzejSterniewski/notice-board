const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/users', UserController.getAll);

router.get('/users/:id', UserController.getById);

router.post('/users', UserController.postUser);

router.patch('/users/:id', UserController.patchUser);

router.delete('/users/:id', UserController.deleteUser);

module.exports = router;