const { pool } = require('./setup.js');

/**
 * @returns Category database object.
 */
async function createCategory(category) {
  const result = await pool.query(`
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *;
  `, [category]);

  return result.rows[0];
}

/**
 * @returns Boolean whether category was successfully deleted.
 */
async function deleteCategories(category) {
  const result = await pool.query(`
    DELETE FROM categories
    WHERE name = $1;
  `, [category]);

  return result.rowCount > 0;
}

module.exports = {
  createCategory,
  deleteCategories,
};
