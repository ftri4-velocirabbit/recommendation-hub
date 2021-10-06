const { pool } = require('./../../server/models/setup');
const databaseModel = require('./../../server/models/databaseModel');
const categoryModel = require('./../../server/models/categoryModel');

/*
  Comments for how to set up local postgres database

  To start/stop service: sudo service postgresql start/stop

  To open database: sudo -u postgres psql <dbname>
  To add tester with roles, inside psql: CREATE USER test PASSWORD 'test';
*/

describe('Test category model interface', () => {
  beforeAll(async () => {
    await databaseModel.destroyDatabase();
    await databaseModel.initDatabase(false);
  });

  afterAll(async () => {
    await databaseModel.destroyDatabase();
    pool.end();
  });

  afterEach(async () => {
    // wipe category table
    await pool.query(`DELETE FROM categories;`, []);
  });

  test('Create a category', async () => {
    const name = 'Books';

    let result = await categoryModel.createCategory(name);
    expect(result).toMatchObject({ name });

    result = await pool.query(`SELECT * FROM categories;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Create a category', async () => {
    const name = 'Books';

    let result = await categoryModel.createCategory(name);
    expect(result).toMatchObject({ name });

    result = await categoryModel.deleteCategories(name);

    result = await pool.query(`SELECT * FROM categories;`, []);
    expect(result.rows).toHaveLength(0);
  });

});
