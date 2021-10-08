const sessionModel = require('../models/sessionModel');

const SESSION_TIMEOUT_DAYS = 7;

/**
 * Middleware: Create a session in the database. Sets `res.locals.session` with database session object if successful.
 */
async function createSession(req, res, next) {
	if (!res.locals.user || res.locals.isLoggedIn) return next();

	const expires = new Date();
	expires.setDate(expires.getDate() + SESSION_TIMEOUT_DAYS);

	const session = await sessionModel.createSession(res.locals.user.username, expires);

	res.locals.session = session;
	return next();
}

/**
 * Middleware: Update or create a session in the database. Sets `res.locals.session` with database session object if successful.
 */
async function updateSession(req, res, next) {
	if (!res.locals.user || res.locals.isLoggedIn) return next();

	const expires = new Date();
	expires.setDate(expires.getDate() + SESSION_TIMEOUT_DAYS);

	// try to update existing session before creating a new one
	// TODO rethink how to handle this with fewer queries
	let session = await sessionModel.findSession(res.locals.user.username);
	if (session) session = await sessionModel.updateSession(session.id, expires);
	if (!session) session = await sessionModel.createSession(res.locals.user.username, expires);

	res.locals.session = session;
	return next();
}

/**
 * Middleware: Sets `res.locals.session` with database session object if session was found for user.
 */
async function findSession(req, res, next) {
	if (!res.locals.user && !res.locals.sid) return next();

	let session;
	if (res.locals.user) session = await sessionModel.findSession(res.locals.user.username);
	else session = await sessionModel.readSession(res.locals.sid);

	if (session) res.locals.session = session;

	return next();
}

/**
 * Middleware: Sets `res.locals.deletedSession` to boolean indicating result of operation.
 */
async function deleteSession(req, res, next) {
	if (!res.locals.session || !res.locals.sid) return next();

	const sid = res.locals?.session.id || res.locals.sid;
	res.locals.deletedSession = await sessionModel.deleteSession(sid);

	return next();
}

module.exports = {
	createSession,
	updateSession,
	deleteSession,
	findSession,
};
