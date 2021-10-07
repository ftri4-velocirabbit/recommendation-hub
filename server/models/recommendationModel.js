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
async function updateRecommendation(id, title, body, date, category, rating) {
  const result = await pool.query(`
    UPDATE recommendations
    SET title = $2, body = $3, date = $4, category = $5 , rating = $6
    WHERE id = $1
    RETURNING *;
  `, [id, title, body, date, category, rating]);

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

/**
 * @returns Array of recommendations for a given username, returns { id, username, name, title, body, date, category, rating } schema.
 */
async function searchRecommendations(username) {
  const result = await pool.query(`
    SELECT r.id, r.username, r.title, r.body, r.date, r.category, r.rating, u.name
    FROM recommendations r
    INNER JOIN users u ON u.username = r.username
    WHERE r.username = $1;
  `, [username]);

  return result.rows;
}

module.exports = {
  createRecommendation,
  readRecommendation,
  updateRecommendation,
  deleteRecommendation,
  searchRecommendations,
};
