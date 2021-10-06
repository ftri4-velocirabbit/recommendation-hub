const { Router } = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');

const router = Router();

router.post('/',
	userController.verifyUser,
	sessionController.deleteSession,
	sessionController.createSession,
	cookieController.createCookie,
	(req, res) => {
		res.status(200).json(res.locals.sid);
	}
);

module.exports = router;
