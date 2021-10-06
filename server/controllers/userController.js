const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

/**
 * @returns user object in res.locals or error
 */
async function verifyUser(req, res, next) {
	try {
		const { username, password } = req.body;
		const user = await userModel.readUser(username);
		console.log(user);

		const match = await bcrypt.compare(password, user.passhash);
		if (!match) return next();

		res.locals.user = user;
		return next();
	} catch (error) {
		return next(error);
	}
}

// createUser - need to bcrypt to save passhash
async function createUser(req, res, next) {}

module.exports = {
	verifyUser,
	createUser,
};
