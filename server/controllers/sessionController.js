const sessionModel = require('../models/sessionModel');

/**
 * @returns session id or error
 */
async function createSession(req, res, next) {
	if (!res.locals.user) return next();
	if (res.locals.isLoggedIn) return next();
	try {
		const { username } = res.locals.user;

		// getting time 7 days from now for session expiration
		let date = new Date();
		let time = date.getTime();
		let expireTime = time + 1000 * 86400 * 7; //1000ms * 86400s/day * 7 days
		date.setTime(expireTime);

		const newSession = await sessionModel.createSession(username, date);

		// TODO handle newSession is undefined with error message

		res.locals.sid = newSession.id;
		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * @returns session id or error
 */
async function updateSession(req, res, next) {
	if (!res.locals.isLoggedIn) return next();
	try {
		// getting time 7 days from now for session expiration
		let date = new Date();
		let time = date.getTime();
		let expireTime = time + 1000 * 86400 * 7; //1000ms * 86400s/day * 7 days
		date.setTime(expireTime);

		const updatedSession = await sessionModel.updateSession(req.cookies.sid, date);
		res.locals.sid = updatedSession.id;

		return next();
	} catch (error) {
		return next(error);
	}
}

/**
 * @returns Boolean whether the session was successfully deleted.
 */
async function deleteSession(req, res, next) {
	if (res.locals.isLoggedIn) return next();
	try {
		const result = await sessionModel.deleteSession(req.cookies.sid);
		res.clearCookie('sid');
		res.locals.deletedSession = result;
		return next();
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	createSession,
	updateSession,
	deleteSession,
};
