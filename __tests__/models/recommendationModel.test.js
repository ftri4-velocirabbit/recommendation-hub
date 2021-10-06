const { pool } = require('../../server/models/setup');
const databaseModel = require('../../server/models/databaseModel');
const userModel = require('../../server/models/userModel');
const {
  createRecommendation,
  readRecommendation,
  updateRecommendation,
  deleteRecommendation,
} = require('./../../server/models/recommendationModel');

/*
  Comments for how to set up local postgres database

  To start/stop service: sudo service postgresql start/stop

  To open database: sudo -u postgres psql <dbname>
  To add tester with roles, inside psql: CREATE USER test PASSWORD 'test';
*/

describe('Test recommendation model interface', () => {
  let username = 'miguel';

  beforeAll(async () => {
    await databaseModel.destroyDatabase();
    await databaseModel.initDatabase();

    // create users
    await userModel.createUser(
      username,
      'Miguel Hernandez',
      'miguel@gmail.com',
      '127.0.0.1',
      new Date(),
      '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa'
    );
  });

  afterAll(async () => {
    await databaseModel.destroyDatabase();
    pool.end();
  });

  afterEach(async () => {
    // wipe used tables
    await pool.query(`DELETE FROM recommendations;`, []);
  });

  test('Create a recommendation', async () => {
    const title = 'My favorite movie';
    const body = 'I have no idea which one it was';
    const date = new Date();
    const category = 'Movies';
    const rating = 2;

    // create a recommendation
    let recommendation = await createRecommendation(username, title, body, date, category, rating);
    expect(recommendation).toMatchObject({ title, body, date, category, rating });

    // database only has one recommendation object
    const result = await pool.query(`SELECT * FROM recommendations;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Read a recommendation', async () => {
    const title = 'My favorite movie';
    const body = 'I have no idea which one it was';
    const date = new Date();
    const category = 'Movies';
    const rating = 2;

    // create a recommendation
    let recommendation = await createRecommendation(username, title, body, date, category, rating);
    expect(recommendation).toMatchObject({ title, body, date, category, rating });

    // read a recommendation
    recommendation = await readRecommendation(recommendation.id);
    expect(recommendation).toMatchObject({ title, body, date, category, rating });

    // database only has one recommendation object
    const result = await pool.query(`SELECT * FROM recommendations;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Update a recommendation', async () => {
    const title = 'My favorite movie';
    const body = 'I have no idea which one it was';
    const date = new Date();
    const category = 'Movies';
    const rating = 2;

    // create a recommendation
    let recommendation = await createRecommendation(username, title, body, date, category, rating);
    expect(recommendation).toMatchObject({ title, body, date, category, rating });

    // update a recommendations
    const title2 = 'My least favorite movie';
    const body2 = 'Probably a scary movie, why watch something that makes you feel bad?';
    const date2 = new Date('2021-10-22');
    const category2 = 'Music';
    const rating2 = 0;
    recommendation = await updateRecommendation(recommendation.id, title2, body2, date2, category2, rating2);
    expect(recommendation).toMatchObject({ title: title2, body: body2, date: date2, category: category2, rating: rating2 });

    // database only has one recommendation object
    const result = await pool.query(`SELECT * FROM recommendations;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Delete a recommendation', async () => {
    const title = 'My favorite movie';
    const body = 'I have no idea which one it was';
    const date = new Date();
    const category = 'Movies';
    const rating = 2;

    // create a recommendation
    let recommendation = await createRecommendation(username, title, body, date, category, rating);
    expect(recommendation).toMatchObject({ title, body, date, category, rating });

    // Delete a recommendation
    recommendation = await deleteRecommendation(recommendation.id);

    // database has no recommendation object
    const result = await pool.query(`SELECT * FROM recommendations;`, []);
    expect(result.rows).toHaveLength(0);
  });

});
