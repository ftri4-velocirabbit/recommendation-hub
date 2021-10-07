const bcrypt = require('bcrypt');

const sessionModel = require('../models/sessionModel');
const userModel = require('../models/userModel');

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

/**
 * Middleware: Search for users based on parameter `term`. Array of front-end User, may be empty, will be set in `res.locals.users`.
 */
async function searchUsers(req, res, next) {
	// confirm user has passes access check
	if (!res.locals.user) return next();
	if (!req.params.term) return next(new Error('Middleware reached without term parameter.'));

	res.locals.users = (await userModel.searchUsers(req.params.term))
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

	const result = await userModel.readUser(res.params.username);

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

	res.locals.dbStatus = await userModel.followUser(res.locals.user.username, req.params.username);

	if (res.locals.dbStatus) {
		// gather followedUsers
		res.locals.followedUsers = (await userModel.getFollowed(res.locals.user.username))
			.map(followRelationship => ({
				name: followRelationship.followed_name,
				username: followRelationship.followed_username,
			}));
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

	res.locals.dbStatus = await userModel.unfollowUser(res.locals.user.username, req.params.username);

	if (res.locals.dbStatus) {
		// gather followedUsers
		res.locals.followedUsers = (await userModel.getFollowed(res.locals.user.username))
			.map(followRelationship => ({
				name: followRelationship.followed_name,
				username: followRelationship.followed_username,
			}));
	}

	return next();
}

module.exports = {
	createUser,
	getUser,
	verifyUser,
	updateUser,
	deleteUser,
	searchUsers,
	getUserProfile,
	followUser,
	unfollowUser
};
