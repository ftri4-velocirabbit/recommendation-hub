const { pool } = require('./setup.js');

/**
 * @returns Object of category added.
 */
async function createCategory(category) {
  const result = await pool.query(
    `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *;
      `,
    [category]
  );
  console.log('create categories', result.rows);
  return result.rows[0];
}

/**
 * @returns Object of category deleted.
 */
async function deleteCategories(category) {
  const result = await pool.query(
    `
    DELETE FROM categories
    WHERE name = $1
    RETURNING *;
    `,
    [category]
  );
  console.log('delete categories', result.rows);
  return result.rows[0];
}

module.exports = {
  createCategory,
  deleteCategories,
};
