const { pool } = require('./setup');

/**
 * @returns Database recommendation object.
 */
async function createRecommendation(username, title, body, date, category, rating) {
  const result = await pool.query(`
    INSERT INTO recommendations(username, title, body, date, category, rating)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `, [username, title, body, date, category, rating]);

  return result.rows[0];
}

/**
 * @returns Database recommendation object or undefined if no recommendation exists.
 */
async function readRecommendation(id) {
  const result = await pool.query(`
    SELECT id, username, title, body, date, category, rating
    FROM recommendations
    WHERE id = $1;
  `, [id]);

  return result.rows[0];
}

/**
 * @returns Database recommendation object or undefined if no recommendation exists.
 */
async function updateRecommendation(id, username, title, body, date, category, rating) {
  const result = await pool.query(`
    UPDATE recommendations
    SET username = $2, title = $3, body = $4, date = $5, category = $6 , rating = $7
    WHERE id = $1
    RETURNING *;
  `, [id, username, title, body, date, category, rating]);

  return result.rows[0];
}

/**
 * @returns Boolean whether the recommendation was successfully deleted.
 */
async function deleteRecommendation(id) {
  const result = await pool.query(`
    DELETE FROM recommendations
    WHERE id = $1;
  `, [id]);

  return result.rowCount > 0;
}

module.exports = {
  createRecommendation,
  readRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
