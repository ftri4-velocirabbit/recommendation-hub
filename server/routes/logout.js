const { Router } = require('express');

const { findSession, deleteSession } = require('../controllers/sessionController');
const { getCookie, removeCookie } = require('../controllers/cookieController');

const router = Router();

router.post('/',
	getCookie,
	findSession,
	deleteSession,
	removeCookie,
	(req, res, next) => {
		if (res.locals.session && !res.locals.deletedSession) return next(new Error(
			'Session was found but could not be deleted.'
		));

		res.json({ message: 'Successfully logged out.' });
	}
);

module.exports = router;
