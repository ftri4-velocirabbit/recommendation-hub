const { Router } = require('express');

const sessionController = require('../controllers/sessionController');

const router = Router();

router.post('/',
	sessionController.deleteSession,
	(req, res) => {
		res.status(200).json(res.locals.deletedSession);
	}
);

module.exports = router;
