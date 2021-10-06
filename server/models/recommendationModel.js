const { pool } = require('./setup');

/**
 * @returns Recommendation object.
 */
async function createRecommendation(title, body, date, category, rating) {
  const result = await pool.query(
    `
    INSERT INTO recommendations(title, body, date, category, rating)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [title, body, date, category, rating]
  );
  return result.rows[0];
}
/**
 * @returns Recommendation object.
 */
async function readRecommendation(sid) {
  const result = await pool.query(
    `
    SELECT id, username
    FROM recommendations
    WHERE id = $1;
  `,
    [sid]
  );

  return result.rows[0];
}

/**
 * @returns Recommendation object.
 */
async function updateRecommendation() {}

/**
 * @returns Boolean.
 */
async function deleteRecommendation() {}

module.exports = {
  createRecommendation,
  readRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
