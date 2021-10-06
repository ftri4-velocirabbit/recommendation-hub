const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

/**
 * @returns user object in res.locals or error
 */
async function createUser(req, res, next) {
	try {
		const { username, password, name, email } = req.body;
		const bcryptHash = await bcrypt.hash(password, SALT_WORK_FACTOR);
		const newUser = await userModel.createUser(username, name, email, req.ip, new Date(), bcryptHash);
		res.locals.newUser = newUser;
		return next();
	} catch (error) {
		return next(error);
	}
}

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

module.exports = {
	verifyUser,
	createUser,
};
