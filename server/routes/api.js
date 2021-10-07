const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.get('/user', userController.getUser, (req, res) => {
	res.status(200).json(res.locals.foundUser);
});

router.post('/user', userController.createUser, sessionController.createSession, cookieController.createCookie, (req, res) => {
	// console.log(res.locals);
	res.status(200).json(res.locals.user);
});

router.patch('/user/:username', userController.updateUser, (req, res) => {
	res.status(200).json(res.locals.user);
});

router.delete('/user/:username', userController.deleteUser, (req, res) => {
	res.status(200).json(res.locals.deletedUser);
});

module.exports = router;
