const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');
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
async function getUser(req, res, next) {
	try {
		const session = await sessionModel.readSession(req.cookies.sid);
		const user = await userModel.readUser(session.username);
		res.locals.user = user;
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

/**
 * @returns user object in res.locals or error
 */
async function updateUser(req, res, next) {
	try {
		const { username } = req.params;
		const user = await userModel.readUser(username);
		let { last_login_ip, last_login_date, passhash } = user;
		const { password } = req.body;
		const name = req.body.name || user.name;
		const email = req.body.email || user.email;
		// if user wants to change password, re-hash and resave
		if (req.body.password) {
			passhash = await bcrypt.hash(password, SALT_WORK_FACTOR);
		}
		const updatedUser = await userModel.updateUser(username, name, email, last_login_ip, last_login_date, passhash);
		console.log(updatedUser);
		res.locals.user = updatedUser;
		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * @returns Boolean whether the user was successfully deleted.
 */
async function deleteUser(req, res, next) {
	try {
		const { username } = req.params;
		const result = await userModel.deleteUser(username);
		res.locals.deleted = result;
		return next();
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	createUser,
	getUser,
	verifyUser,
	updateUser,
	deleteUser,
};
