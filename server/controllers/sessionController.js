const sessionModel = require('../models/sessionModel');

const SESSION_TIMEOUT_DAYS = 7;

/**
 * Middleware: Create a session in the database. Sets `res.locals.sid` and `res.locals.expires` if successful.
 */
async function createSession(req, res, next) {
	if (!res.locals.user || res.locals.isLoggedIn) return next();

	try {
		const expires = new Date();
		expires.setDate(expires.getDate() + SESSION_TIMEOUT_DAYS);

		const session = await sessionModel.createSession(res.locals.user.username, expires);

		res.locals.sid = session.id;
		res.locals.expires = expires;
	} catch (error) {
		return next(error);
	}

	return next();
}

/**
 * Middleware: Update or create a session in the database. Sets `res.locals.sid` and `res.locals.expires` if successful.
 */
async function updateSession(req, res, next) {
	if (!res.locals.user || res.locals.isLoggedIn) return next();

	try {
		const expires = new Date();
		expires.setDate(expires.getDate() + SESSION_TIMEOUT_DAYS);

		// try to update existing session before creating a new one
		// TODO rethink how to handle this with fewer queries
		let session = await sessionModel.findSession(res.locals.user.username);
		session = await sessionModel.updateSession(session.id, expires);
		if (!session) session = await sessionModel.createSession(res.locals.user.username, expires);

		res.locals.sid = session.id;
		res.locals.expires = expires;
	} catch (error) {
		return next(error);
	}

	return next();
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
