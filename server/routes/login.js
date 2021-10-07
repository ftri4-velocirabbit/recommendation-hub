const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.post(
	'/',
	userController.verifyUser,
	sessionController.updateSession,
	sessionController.deleteSession,
	sessionController.createSession,
	cookieController.createCookie,
	(req, res) => {
		res.status(200).json(res.locals.user);
	}
);

module.exports = router;
