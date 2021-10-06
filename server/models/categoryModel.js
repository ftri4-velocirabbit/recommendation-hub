const { pool } = require('./setup.js');

/**
 * @returns .
 */
async function createCategory(category) {
  console.log({ pool });

  const result = await pool.query(
    `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *;
      `,
    [category]
  );

  return result.rows[0];
}

/**
 * @returns .
 */
async function deleteCategories() {
  const result = await pool.query(
    `
    DELETE FROM categories;
    `
  );
  return result.rows[0];
}

module.exports = {
  createCategory,
  deleteCategories,
};
