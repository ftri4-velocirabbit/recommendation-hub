const { Pool } = require('pg');

const PG_URI = 'postgres://rirwmava:ypcmjFpE82iON1hZ7OIxb3WjRmofylsk@chunee.db.elephantsql.com/rirwmava';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };