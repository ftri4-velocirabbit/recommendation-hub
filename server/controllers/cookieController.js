/**
 * Middleware: Sets session cookies in response object.
 */
async function setCookie(req, res, next) {
	if (!res.locals.session || res.locals.isLoggedIn) return next();

	res.cookie('sid', res.locals.session.id, { httpOnly: true, sameSite: 'lax', expires: res.locals.session.expires });
	return next();
}

/**
 * Middleware: Sets `res.locals.sid` if user request provided a proper cookie.
 */
async function getCookie(req, res, next) {
	if (req.cookies.sid) res.locals.sid = req.cookies.sid;
	return next();
}

/**
 * Middleware: Sets up to removed session cookie in response object.
 */
async function removeCookie(req, res, next) {
	res.clearCookie('sid', { httpOnly: true, sameSite: 'lax' });
	return next();
}

module.exports = {
	setCookie,
	removeCookie,
	getCookie,
};
