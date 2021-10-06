const { Pool } = require('pg');
const { PG_URI } = require('./connection.json');

const pool = new Pool({
  connectionString: PG_URI,
  max: 5,
});

module.exports = { pool };
