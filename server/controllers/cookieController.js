/**
 * Middleware: Sets session cookies in response object.
 */
async function createCookie(req, res, next) {
	if (!res.locals.sid || res.locals.isLoggedIn) return next();
	if (!res.locals.expires) return next(new Error('res.locals.sid was set but res.locals.expires was not.'));

	res.cookie('sid', res.locals.sid, { httpOnly: true, sameSite: 'lax', expires: res.locals.expires });
	return next();
}

/**
 * Middleware: Sets up to removed session cookie in response object.
 */
async function removeCookie(req, res, next) {
	if (!res.locals.sid) return next();

	res.clearCookie('sid', { httpOnly: true, sameSite: 'lax' });
	return next();
}

module.exports = {
	createCookie,
	removeCookie,
};
