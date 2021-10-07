const express = require('express');
// const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
// const cookieController = require('../controllers/cookieController');
const router = express.Router();

router.post('/', sessionController.deleteSession, (req, res) => {
	res.status(200).json(res.locals.deletedSession);
});

module.exports = router;
