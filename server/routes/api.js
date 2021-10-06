const express = require('express');
const userController = require('../controllers/userController');
// const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post('/user', userController.createUser, (req, res) => {
	res.status(200).json(res.locals.newUser);

	// if you had res.locals.sid, then set cookies
	// TODO final response
});

module.exports = router;
