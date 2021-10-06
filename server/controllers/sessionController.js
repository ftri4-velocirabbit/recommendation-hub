const sessionModel = require('../models/sessionModel');

/**
 * @returns session id or error
 */
async function createSession(req, res, next) {
	if (!res.locals.user) return next();

	try {
		const { username } = res.locals.user;
		// todo date plus our expired time lapse
		const newSession = await sessionModel.createSession(username, new Date());

		// TODO handle newSession is undefined with error message

		console.log(newSession);

		res.locals.sid = newSession.id;
		return next();
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	createSession,
};
