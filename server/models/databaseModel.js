const { pool } = require('./setup.js');

const { createCategory } = require('./categoryModel');

const CATEGORIES = ['Algorithms', 'Food', 'Games', 'Movies', 'Music', 'Travel'];

async function initDatabase() {
  await pool
    .query(
      `
      CREATE TABLE categories(
      name VARCHAR NOT NULL PRIMARY KEY
      );
    `,
      []
    )
    .then((result) => {
      console.log(result);
    });

  await Promise.all(CATEGORIES.map((category) => createCategory(category)));

  await pool
    .query(
      `
    CREATE TABLE users(
      username VARCHAR NOT NULL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      passhash VARCHAR NOT NULL,
      last_login_ip VARCHAR NOT NULL,
      last_login_date TIMESTAMP NOT NULL
    );
  `,
      []
    )
    .then((result) => {
      console.log(result);
    });

  await pool
    .query(
      `
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
  `,
      []
    )
    .then((result) => {
      console.log(result);
    });

  // await pool
  //   .query(
  //     `
  //   CREATE TABLE user_recommendations(
  //     id SERIAL NOT NULL PRIMARY KEY,
  //     username VARCHAR NOT NULL,
  //     recommendation_id INT NOT NULL,
  //     FOREIGN KEY (username) REFERENCES users(username),
  //     FOREIGN KEY (recommendation_id) REFERENCES recommendations(id)
  //   );
  // `,
  //     []
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   });

  await pool
    .query(
      `
    CREATE TABLE user_follows(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      followed_username VARCHAR NOT NULL,
      FOREIGN KEY (followed_username) REFERENCES users(username)
    );
  `,
      []
    )
    .then((result) => {
      console.log(result);
    });

  await pool
    .query(
      `
    CREATE TABLE sessions(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      expires TIMESTAMP NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username)
    );
  `,
      []
    )
    .then((result) => {
      console.log(result);
    });
}

async function destroyDatabase() {
  try {
    await pool
      .query(
        `
      DROP TABLE sessions;
    `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool
      .query(
        `
    DROP TABLE user_follows;
  `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool
      .query(
        `
    DROP TABLE user_recommendations;
  `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool
      .query(
        `
    DROP TABLE recommendations;
  `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool
      .query(
        `
    DROP TABLE users;
  `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool
      .query(
        `
    DROP TABLE categories;
  `,
        []
      )
      .then((result) => {
        console.log(result);
      });
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }
}

module.exports = { initDatabase, destroyDatabase };
