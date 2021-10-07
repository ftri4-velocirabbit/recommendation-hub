const { Pool } = require('pg');
const { PG_URI } = require('./connection.json');

let pool;
if (process.env.NODE_ENV !== 'test') { //'production') {
  pool = new Pool({
    connectionString: PG_URI,
    max: 5,
  });
} else {
  pool = new Pool({
    database: 'recommendation',
    user: 'test',
    password: 'test',
  });
}

module.exports = { pool };
