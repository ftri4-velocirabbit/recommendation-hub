const { pool } = require('./setup.js');

const { createCategory } = require('./categoryModel');
const { createUser } = require('./userModel');

const CATEGORIES = require('./../../shared/categories.json');

/**
 * Initialize all database tables. Must be used on a database without matching tables. Call `destroyDatabase` first if needed.
 */
async function initDatabase(fillCategories = true) {
  await pool.query(`
      CREATE TABLE categories(
      name VARCHAR NOT NULL PRIMARY KEY
      );
    `, []);

  if (fillCategories) await Promise.all(CATEGORIES.map((category) => createCategory(category)));

  await pool.query(`
    CREATE TABLE users(
      username VARCHAR NOT NULL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      passhash VARCHAR NOT NULL,
      last_login_ip VARCHAR NOT NULL,
      last_login_date TIMESTAMP NOT NULL
    );
  `, []);

  const asyncQueries = [];

  asyncQueries.push(pool.query(`
    CREATE TABLE recommendations(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      title VARCHAR NOT NULL,
      body VARCHAR NOT NULL,
      date TIMESTAMP NOT NULL,
      category VARCHAR,
      rating INT NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (category) REFERENCES categories(name)
    );
  `, []));

  asyncQueries.push(pool.query(/*`
    CREATE TABLE user_follows(
      id VARCHAR NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      followed_username VARCHAR NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (followed_username) REFERENCES users(username)
    );
  `*/
    `
    CREATE TABLE user_follows(
      id VARCHAR NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      followed_username VARCHAR NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (followed_username) REFERENCES users(username)
    );
  `, []));

  asyncQueries.push(pool.query(`
    CREATE TABLE sessions(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      expires TIMESTAMP NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username)
    );
  `, []));

  await Promise.all(asyncQueries);
}

/**
 * Drop all database tables. Can be used with partially created database.
 */
async function destroyDatabase() {
  try {
    await pool.query(`
      DROP TABLE sessions;
    `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE user_follows;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE user_recommendations;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE recommendations;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE users;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE categories;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }
}

/**
 * Fill database with some test data.
 */
async function prefillDatabase() {
  const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
  const lastLoginDate = new Date();
  const lastLoginIp = '127.0.0.1';
  const users = [
    { username: 'adam', name: 'Adam Sheff', email: 'adam@gmail.com' },
    { username: 'ali', name: 'Ali', email: 'ali@gmail.com' },
    { username: 'angylynn', name: 'Angelyn Truong', email: 'angyltnn@gmail.com' },
    { username: 'Anne Chan', name: 'Anne Chan', email: 'ann@gmail.com' },
    { username: 'clinton', name: 'Clinton Quach', email: 'clinton@gmail.com' },
    { username: 'conrad', name: 'Conrad Friesen', email: 'conrad@gmail.com' },
    { username: 'daniel', name: 'Daniel', email: 'daniel@gmail.com' },
    { username: 'danni', name: 'Danni Denmark', email: 'danni@gmail.com' },
    { username: 'duke', name: 'Duke Lee', email: 'duke@gmail.com' },
    // TODO add everyone else
  ];

  // Create users
  for (const user of users) {
    await createUser(user.username, user.name, user.email, lastLoginIp, lastLoginDate, passhash);
  }

  // Create recommendations

}

module.exports = { initDatabase, destroyDatabase, prefillDatabase };
