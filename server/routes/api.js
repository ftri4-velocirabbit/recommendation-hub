const express = require('express');
const userController = require('../controllers/userController');
// const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/user', userController.getUser, (req, res) => {
	res.status(200).json(res.locals.user);
});

router.post('/user', userController.createUser, (req, res) => {
	res.status(200).json(res.locals.newUser);
});

router.patch('/user/:username', userController.updateUser, (req, res) => {
	res.status(200).json(res.locals.user);
});

router.delete('/user/:username', userController.deleteUser, (req, res) => {
	res.status(200).json(res.locals.deleted);
});

module.exports = router;
