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
		const user = await userModel.createUser(username, name, email, req.ip, new Date(), bcryptHash);
		res.locals.user = user;
		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * @returns user object with followed and followers in res.locals or error
 */
async function getUser(req, res, next) {
	try {
		const userObj = {};
		const session = await sessionModel.readSession(req.cookies.sid);
		userObj.user = await userModel.readUser(session.username);

		userObj.followedUsers = [];
		const followedArray = await userModel.getFollowed(session.username);
		for (let followed of followedArray) {
			const followedUser = await userModel.readUser(followed.followed_username);
			userObj.followedUsers.push(followedUser);
		}

		userObj.followers = [];
		const followersArray = await userModel.getFollowers(session.username);
		for (let follower of followersArray) {
			const followerUser = await userModel.readUser(follower.username);
			userObj.followers.push(followerUser);
		}

		res.locals.foundUser = userObj;
		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * @returns user object and checks if still logged in or session is expired in res.locals or error
 */
async function verifyUser(req, res, next) {
	try {
		// 1 - check if given password ties to passhash using bcrypt compare
		const { username, password } = req.body;
		const user = await userModel.readUser(username);
		const match = await bcrypt.compare(password, user.passhash);
		if (!match) return next();

		// 2 - update last ip and last login date in users table
		await userModel.updateUser(user.username, user.name, user.email, req.ip, new Date(), user.passhash);

		// 3 - check if session is expired or is still logged in
		const currentSession = await sessionModel.readSession(req.cookies.sid);
		const now = new Date();
		if (currentSession && currentSession.expires < now) res.locals.isLoggedIn = true;
		else res.locals.isLoggedIn = false;

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
		res.locals.deletedUser = result;
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
