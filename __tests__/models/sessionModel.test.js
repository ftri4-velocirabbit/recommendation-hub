const { pool } = require('../../server/models/setup');
const { initDatabase, destroyDatabase } = require('../../server/models/databaseModel');
const { createUser } = require('../../server/models/userModel');
const { createSession, readSession, findSession, updateSession, deleteSession } = require('../../server/models/sessionModel');

/*
  Comments for how to set up local postgres database

  To start/stop service: sudo service postgresql start/stop

  To open database: sudo -u postgres psql <dbname>
  To add tester with roles, inside psql: CREATE USER test PASSWORD 'test';
*/

describe('Test session model interface', () => {
  let username = 'miguel';

  beforeAll(async () => {
    await destroyDatabase();
    await initDatabase();

    // create users
    await createUser(
      username,
      'Miguel Hernandez',
      'miguel@gmail.com',
      '127.0.0.1',
      new Date(),
      '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa'
    );
  });

  afterAll(async () => {
    await destroyDatabase();
    pool.end();
  });

  afterEach(async () => {
    // wipe session tables
    await pool.query(`DELETE FROM sessions;`, []);
  });

  test('Create a session', async () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 5);

    // create a session
    let session = await createSession(username, expires);
    expect(session).toMatchObject({ username, expires });

    // database only has one session object
    const result = await pool.query(`SELECT * FROM sessions;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Read a session', async () => {
    const expires = new Date();

    // create a session
    let session = await createSession(username, expires);
    expect(session).toMatchObject({ username, expires });

    // read a session
    session = await readSession(session.id);
    expect(session).toMatchObject({ username, expires });

    // database only has one session object
    const result = await pool.query(`SELECT * FROM sessions;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Find a session by username', async () => {
    const expires = new Date();

    // create a session
    let session = await createSession(username, expires);
    expect(session).toMatchObject({ username, expires });

    // find a session
    session = await findSession(username);
    expect(session).toMatchObject({ username, expires });

    // database only has one session object
    const result = await pool.query(`SELECT * FROM sessions;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Update a session', async () => {
    const expires = new Date();

    // create a session
    let session = await createSession(username, expires);
    expect(session).toMatchObject({ username, expires });

    // update a session
    const expires2 = new Date('2020-01-01');
    session = await updateSession(session.id, expires2);
    expect(session).toMatchObject({ username, expires: expires2 });

    // updating a session for an sid that does not exists returns undefined
    session = await updateSession(99, expires);
    expect(session).toBeUndefined();

    // database only has one session object
    const result = await pool.query(`SELECT * FROM sessions;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Delete a session', async () => {
    const expires = new Date();

    // create a session
    let session = await createSession(username, expires);
    expect(session).toMatchObject({ username, expires });

    // Delete a session
    session = await deleteSession(session.id);

    // database should not have any session objects
    const result = await pool.query(`SELECT * FROM sessions;`, []);
    expect(result.rows).toHaveLength(0);
  });

});
