const { pool } = require('./setup');

/**
 * @returns Database user object or undefined if user with that username already exists.
 */
async function createUser(username, name, email, lastLoginIp, lastLoginDate, passhash) {
	try {
		const result = await pool.query(
			`
      INSERT INTO users(username, name, email, passhash, last_login_ip, last_login_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
			[username, name, email, passhash, lastLoginIp, lastLoginDate]
		);

		return result.rows[0];
	} catch (_) {
		// return undefined if not possible
	}
}

/**
 * @returns Database user object or undefined if no user found.
 */
async function readUser(username) {
	const result = await pool.query(
		`
    SELECT username, name, email, passhash, last_login_ip, last_login_date
    FROM users
    WHERE username = $1;
  `,
		[username]
	);

	return result.rows[0];
}

/**
 * @returns Database user object or undefined if no matching user exist in the database.
 */
async function updateUser(username, name, email, lastLoginIp, lastLoginDate, passhash = undefined) {
	let result;
	if (passhash) {
		result = await pool.query(
			`
      UPDATE users
      SET username = $1, name = $2, email = $3, passhash = $4, last_login_ip = $5, last_login_date = $6
      WHERE username = $1
      RETURNING username, name, email, passhash, last_login_ip, last_login_date;
    `,
			[username, name, email, passhash, lastLoginIp, lastLoginDate]
		);
	} else {
		result = await pool.query(
			`
    UPDATE users
    SET username = $1, name = $2, email = $3, last_login_ip = $4, last_login_date = $5
    WHERE username = $1
    RETURNING username, name, email, passhash, last_login_ip, last_login_date;
  `,
			[username, name, email, lastLoginIp, lastLoginDate]
		);
	}

	return result.rows[0];
}

/**
 * @returns True when a user has been successfully deleted and false when there was no matching user in the database.
 */
async function deleteUser(username) {
	const result = await pool.query(
		`
      DELETE FROM users
      WHERE username = $1;
    `,
		[username]
	);

	return result.rowCount > 0;
}

/**
 * @returns `Boolean` wether follow relationship was established. If false, either one of both of the user do not
 * exist in user table, or both users have the same username.
 */
async function followUser(username, followed_username) {
	if (username === followed_username) return false;

	try {
		// try to create relationship, but it may fail if either user do not exist.
		const result = await pool.query(
			`
      INSERT INTO user_follows (id, username, followed_username)
      VALUES ($1, $2, $3);
    `,
			[username + followed_username, username, followed_username]
		);

		// TODO

		return true;
	} catch (error) {
		if (error.message.match(/user_follows_pkey/i)) return true; // already exists
		return false;
	}
}

/**
 * @returns Array of objects that contain followed usernames or empty array if either username does not exist or username does not follow anyone.
 */
async function getFollowed(username) {
	const result = await pool.query(
		`
    SELECT * FROM user_follows
    WHERE username = $1;
  `,
		[username]
	);
	return result.rows;
}

/**
 * @returns Array of objects that contain followers under username or empty array if either username does not exist or noone follows him/her.
 */
async function getFollowers(followed_username) {
	const result = await pool.query(
		`
    SELECT * FROM user_follows
    WHERE followed_username = $1;
  `,
		[followed_username]
	);
	return result.rows;
}

module.exports = {
	createUser,
	readUser,
	updateUser,
	deleteUser,
	followUser,
	getFollowed,
	getFollowers,
};
