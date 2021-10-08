const bcrypt = require('bcrypt');

// TODO refactor to using userController namespace
const {
	createUser: umCreateUser,
	readUser,
	getPeopleThatFollowUser,
	getPeopleUserFollows,
	updateUser: umUpdateUser,
	searchUsers: umSearchUsers,
	followUser: umFollowUser,
	unfollowUser: umUnfollowUser,
} = require('../models/userModel');
const { isValidName, isValidEmail, isValidPassword, isValidUsername } = require('./../../shared/validation');

const SALT_WORK_FACTOR = 10;

/**
 * Middleware: Create a user in the database. If successful, `res.locals.user` will be set to front-end User schema. If registration failed, `res.locals.error`
 * will contain client error message to be used with status 401 response.
 */
async function createUser(req, res, next) {
	try {
		const { name, username, password, email } = req.body;

		if (!isValidName(name)) {
			res.locals.error = 'Invalid Name: PLease omit numbers and special characters';
		} else if (!isValidUsername(username)) {
			res.locals.error = 'Username may only be word and digit characters without spaces.';
		} else if (!isValidPassword(password)) {
			res.locals.error = 'Password must include upper-case, lower-case, number digit, and be at least 6 characters long.';
		} else if (!isValidEmail(email)) {
			res.locals.error = 'Invalid email.';
		}

		if (res.locals.error) return next();

		const ip = req.headers['x-forwarded-for'] || req.ip;
		const passhash = await bcrypt.hash(password, SALT_WORK_FACTOR);

		const user = await umCreateUser(username, name, email, ip, new Date(), passhash);
		if (!user) {
			res.locals.error = 'Username already exists.';
			return next();
		}

		res.locals.user = {
			name: user.name,
			username: user.username,
			email: user.email,
		};
	} catch (error) {
		return next(error);
	}

	return next();
}

/**
 * Middleware: Obtain information about the requesting user. If successful, `res.locals.user` will be set to front-end user schema,
 * and `res.locals.followedUsers` will be set to array of front-end schema UserListItem, and `res.locals.followers` will be
 * set to array of front-end schema UserListItem.
 */
async function getUser(req, res, next) {
	if (!res.locals.session) return next();

	const user = await readUser(res.locals.session.username);
	if (!user) return next();

	const followedUsers = await getPeopleUserFollows(user.username);
	const followers = await getPeopleThatFollowUser(user.username);

	res.locals.user = {
		name: user.name,
		username: user.username,
		email: user.email,
	};
	res.locals.followedUsers = followedUsers;
	res.locals.followers = followers;

	return next();
}

/**
 * Middleware: Verifies a user login. If successful, `res.locals.user` will be set to the user database schema. If login failed, `res.locals.error`
 * will contain client error message to be used with status 401 response.
 */
async function verifyUserLogin(req, res, next) {
	try {
		const { username, password } = req.body;

		if (!isValidUsername(username) || !isValidPassword(password)) {
			// login failed due to invalid format
			res.locals.error = 'Incorrect credentials.';
			return next();
		}

		const user = await readUser(username);
		if (!user) {
			res.locals.error = 'Username does not exist.';
			return next();
		}

		// check password
		const match = await bcrypt.compare(password, user.passhash);
		if (!match) {
			res.locals.error = 'Incorrect password';
			return next();
		}

		// update last ip and last login date in users table
		const ip = req.headers['x-forwarded-for'] || req.ip;
		await umUpdateUser(user.username, user.name, user.email, ip, new Date());

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
		const user = await readUser(username);
		let { last_login_ip, last_login_date, passhash } = user;
		const { password } = req.body;
		const name = req.body.name || user.name;
		const email = req.body.email || user.email;
		// if user wants to change password, re-hash and resave
		if (req.body.password) {
			passhash = await bcrypt.hash(password, SALT_WORK_FACTOR);
		}
		const updatedUser = await umUpdateUser(username, name, email, last_login_ip, last_login_date, passhash);
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
		const result = await deleteUser(username);
		res.locals.deletedUser = result;
		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * Middleware: Search for users based on parameter `term`. Array of front-end User, may be empty, will be set in `res.locals.users`.
 */
async function searchUsers(req, res, next) {
	if (!res.locals.session) return next();
	if (!req.params.term) return next(new Error('Middleware reached without term parameter.'));

	req.params.term = decodeURIComponent(req.params.term);

	res.locals.users = (await umSearchUsers(req.params.term))
		.map(user => ({
			name: user.name,
			username: user.username,
			email: user.email,
		}));
	return next();
}

/**
 * Middleware: Search for a user profile information on parameter `username`. If found, sets `res.local.foundUser` 
 * to a User front-end schema object.
 */
async function getUserProfile(req, res, next) {
	// confirm user has passes access check
	if (!res.locals.user) return next();
	if (!req.params.username) return next(new Error('Middleware reached without username parameter.'));

	const result = await readUser(res.params.username);

	res.locals.user = {
		name: result.name,
		username: result.username,
		email: result.email,
	};
	return next();
}

/**
 * Middleware: Sync with database a user follow event. Boolean set at `res.locals.dbStatus` will indicate
 * wether follow was successful. If true, `res.locals.followedUsers` will be an array of front-end schema UserListItem.
 */
async function followUser(req, res, next) {
	// confirm user has passes access check
	if (!res.locals.user) return next();
	if (!req.params.username) return next(new Error('Middleware reached without username parameter.'));

	req.params.username = decodeURIComponent(req.params.username);

	res.locals.dbStatus = await umFollowUser(res.locals.user.username, req.params.username);

	if (res.locals.dbStatus) {
		res.locals.followedUsers = await getPeopleUserFollows(res.locals.user.username);
	}

	return next();
}

/**
 * Middleware: Sync with database a user un-follow event. Boolean set at `res.locals.dbStatus` will indicate
 * wether follow was successful. If true, `res.locals.followedUsers` will be an array of front-end schema UserListItem.
 */
async function unfollowUser(req, res, next) {
	// confirm user has passes access check
	if (!res.locals.user) return next();
	if (!req.params.username) return next(new Error('Middleware reached without username parameter.'));

	req.params.username = decodeURIComponent(req.params.username);

	res.locals.dbStatus = await umUnfollowUser(res.locals.user.username, req.params.username);

	if (res.locals.dbStatus) {
		res.locals.followedUsers = await getPeopleUserFollows(res.locals.user.username);
	}

	return next();
}

module.exports = {
	createUser,
	getUser,
	verifyUserLogin,
	updateUser,
	deleteUser,
	searchUsers,
	getUserProfile,
	followUser,
	unfollowUser
};
