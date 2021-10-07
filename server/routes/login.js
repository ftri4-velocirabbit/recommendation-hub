const { Router } = require('express');

const { verifyUserLogin } = require('../controllers/userController');
const { updateSession } = require('../controllers/sessionController');
const { createCookie } = require('../controllers/cookieController');

const router = Router();

router.post('/',
	verifyUserLogin,
	updateSession,
	createCookie,
	(req, res, next) => {
		if (res.locals.error) return res.status(401).json({ error: res.locals.error });
		if (!res.locals.user) return next(new Error('Failed to create user in database.'));
		if (!res.locals.sid) return next(new Error('User created, but session was not set.'));

		return res.json({ user: res.locals.user });
	}
);

module.exports = router;
