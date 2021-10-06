const userModel = require('./../../server/models/userModel');
const databaseModel = require('./../../server/models/databaseModel');
const { pool } = require('./../../server/models/setup');

/*
  Comments for how to set up local postgres database

  To start/stop service: sudo service postgresql start/stop

  To open database: sudo -u postgres psql <dbname>
  To add tester with roles, inside psql: CREATE USER test PASSWORD 'test';
*/

describe('Test user model interface', () => {
  beforeAll(async () => {
    await databaseModel.destroyDatabase();
    await databaseModel.initDatabase();
  });

  afterAll(async () => {
    await databaseModel.destroyDatabase();
    pool.end();
  });

  test('Create a user', async () => {
    const username = 'miguel';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    let user = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // create a user that already exists
    user = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user).toBeUndefined();
  });

  test('Read a user', async () => {
    const username = 'miguel2';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    let user = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // read user
    user = await userModel.readUser(username);
    expect(user).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // reading a user that does not exist
    user = await userModel.readUser('fakeusername');
    expect(user).toBeUndefined();
  });

  test('Update a user', async () => {
    const username = 'miguel3';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    let user = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    const name2 = 'Migndez';
    const email2 = 'miguelh72@ook.com';
    const last_login_ip2 = '128.0.0.1';
    const last_login_date2 = new Date('1992-03-19');

    // update user without passhash
    user = await userModel.updateUser(username, name2, email2, last_login_ip2, last_login_date2);
    expect(user).toMatchObject({ username, name: name2, email: email2, passhash, last_login_ip: last_login_ip2, last_login_date: last_login_date2 });

    const name3 = 'Michael Hacker';
    const email3 = 'miguelh72@yahoo.com';
    const passhash3 = '$2b$10$nOUIsKdOKf9xYT5kJuaOKdOKf9xKdOKf9xYTYT0KKKdOKf9xYTIGSJwFa';
    const last_login_ip3 = '130.0.0.1';
    const last_login_date3 = new Date('2020-03-19');

    // update user with passhash
    user = await userModel.updateUser(username, name3, email3, last_login_ip3, last_login_date3, passhash3);
    expect(user).toMatchObject({ username, name: name3, email: email3, passhash: passhash3, last_login_ip: last_login_ip3, last_login_date: last_login_date3 });

    // update a user that does not exist
    user = await userModel.readUser('fakeusername', name, email, last_login_ip, last_login_date, passhash);
    expect(user).toBeUndefined();
  });

  test('Delete a user', async () => {
    const username = 'miguel4';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    let user = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // delete user
    user = await userModel.deleteUser(username);
    expect(user).toBe(true);

    // delete user that does not exist
    user = await userModel.deleteUser(username);
    expect(user).toBe(false);
  });

  test('Follow a user', async () => {
    throw 'TODO test follow and unfollow user';
  });

});
