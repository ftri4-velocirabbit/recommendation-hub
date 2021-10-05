const { Pool } = require('pg');

const PG_URI = 'postgres://pvjywktf:3lB6lLLkomtvfdffLQzN32BlCM13ossw@fanny.db.elephantsql.com/pvjywktf';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};