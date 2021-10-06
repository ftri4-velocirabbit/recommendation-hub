/**
 * sets cookie or error
 */
async function createCookie(req, res, next) {
	if (!res.locals.sid) return next();

	try {
		res.cookie('sid', res.locals.sid);
		return next();
	} catch (error) {
		return next(error);
	}
}

module.exports = {
	createCookie,
};
