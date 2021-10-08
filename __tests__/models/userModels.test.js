const { pool } = require('./../../server/models/setup');
const userModel = require('./../../server/models/userModel');
const databaseModel = require('./../../server/models/databaseModel');

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

  afterEach(async () => {
    // wipe used tables
    await pool.query(`DELETE FROM user_follows;`, []);
    await pool.query(`DELETE FROM users;`, []);
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

    // database only has one user object
    const result = await pool.query(`SELECT * FROM users;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Read a user', async () => {
    const username = 'miguel';
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

    // database only has one user object
    const result = await pool.query(`SELECT * FROM users;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Search for users', async () => {
    const username = 'miguel';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    const username2 = 'adam';
    const name2 = 'Adam Smith';
    const email2 = 'adam@outlook.com';

    const username3 = 'Maria';
    const name3 = 'Maria Smith';
    const email3 = 'maria@google.com';

    await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username2, name2, email2, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username3, name3, email3, last_login_ip, last_login_date, passhash);

    // search for users with term "smith"
    let users = await userModel.searchUsers('smith');
    expect(users).toHaveLength(2);
    expect(users).toMatchObject([
      //{ username, name, email, passhash, last_login_ip, last_login_date },
      { username: username2, name: name2, email: email2, passhash, last_login_ip, last_login_date },
      { username: username3, name: name3, email: email3, passhash, last_login_ip, last_login_date },
    ]);

    users = await userModel.searchUsers('outlook');
    expect(users).toHaveLength(2);
    expect(users).toMatchObject([
      { username, name, email, passhash, last_login_ip, last_login_date },
      { username: username2, name: name2, email: email2, passhash, last_login_ip, last_login_date },
    ]);

    users = await userModel.searchUsers('guel');
    expect(users).toHaveLength(1);
    expect(users).toMatchObject([
      { username, name, email, passhash, last_login_ip, last_login_date },
    ]);

    // database only has one user object
    const result = await pool.query(`SELECT * FROM users;`, []);
    expect(result.rows).toHaveLength(3);
  });

  test('Update a user', async () => {
    const username = 'miguel';
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

    // database only has one user object
    const result = await pool.query(`SELECT * FROM users;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Delete a user', async () => {
    const username = 'miguel';
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

    // database only has no user object
    const result = await pool.query(`SELECT * FROM users;`, []);
    expect(result.rows).toHaveLength(0);
  });

  test('Follow a user', async () => {
    const username = 'miguel';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    const user1 = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user1).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // user must not be able to follow himself
    let result = await userModel.followUser(username, username);
    expect(result).toBe(false);

    const username2 = 'adam';
    const user2 = await userModel.createUser(username2, name, email, last_login_ip, last_login_date, passhash);
    expect(user2).toMatchObject({ username: username2, name, email, passhash, last_login_ip, last_login_date });

    // user1 should follow user 2
    result = await userModel.followUser(username, username2);
    expect(result).toBe(true);

    // attempting to set same follow relationship again should not create a second entry
    result = await userModel.followUser(username, username2);
    expect(result).toBe(true);

    result = await pool.query(`
      SELECT * FROM user_follows
      WHERE username = $1 AND followed_username = $2;`
      , [username, username2]);
    expect(result.rows).toHaveLength(1);

    // attempting to follow a user that does not exist should fail
    result = await userModel.followUser(username, 'fakeuser');
    expect(result).toBe(false);
    result = await userModel.followUser('anotherfake', username);
    expect(result).toBe(false);

    // database only has one user_follows object
    result = await pool.query(`SELECT * FROM user_follows;`, []);
    expect(result.rows).toHaveLength(1);
  });

  test('Unfollow a user', async () => {
    const username = 'miguel';
    const name = 'Miguel Hernandez';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    const user1 = await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    expect(user1).toMatchObject({ username, name, email, passhash, last_login_ip, last_login_date });

    // user unfollowing himself should return true
    let result = await userModel.unfollowUser(username, username);
    expect(result).toBe(true);

    const username2 = 'adam';
    const user2 = await userModel.createUser(username2, name, email, last_login_ip, last_login_date, passhash);
    expect(user2).toMatchObject({ username: username2, name, email, passhash, last_login_ip, last_login_date });
    result = await userModel.followUser(username, username2);
    expect(result).toBe(true);

    // user1 should be able to unfollow user2
    result = await userModel.unfollowUser(username, username2);
    expect(result).toBe(true);
    result = await pool.query(`
      SELECT * FROM user_follows
      WHERE username = $1 AND followed_username = $2;`
      , [username, username2]);
    expect(result.rows).toHaveLength(0);

    // further unfollow should also return true
    result = await userModel.unfollowUser(username, username2);
    expect(result).toBe(true);

    // attempting to follow a user that does not exist should return true since no relationship exists between them after the call
    result = await userModel.unfollowUser(username, 'fakeuser');
    expect(result).toBe(true);
    result = await userModel.unfollowUser('anotherfake', username);
    expect(result).toBe(true);

    // database only has no user_follows object
    result = await pool.query(`SELECT * FROM user_follows;`, []);
    expect(result.rows).toHaveLength(0);
  });

  test('Test getting a list of people you follow', async () => {
    const username = 'miguel';
    const username2 = 'adam';
    const username3 = 'mary';
    const name = 'Miguel Hernandez';
    const name2 = 'Adam Smith';
    const name3 = 'Mary Smith';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username2, name2, email, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username3, name3, email, last_login_ip, last_login_date, passhash);

    await userModel.followUser(username, username2);

    let result = await userModel.getPeopleUserFollows(username);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ username: username2, name: name2 });

    await userModel.followUser(username, username3);

    result = await userModel.getPeopleUserFollows(username);
    expect(result).toHaveLength(2);
    expect(result).toMatchObject([
      { username: username2, name: name2 },
      { username: username3, name: name3 },
    ]);
  });

  test('Test getting a list of people that follow the user', async () => {
    const username = 'miguel';
    const username2 = 'adam';
    const username3 = 'mary';
    const name = 'Miguel Hernandez';
    const name2 = 'Adam Smith';
    const name3 = 'Mary Smith';
    const email = 'miguelh72@outlook.com';
    const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
    const last_login_ip = '127.0.0.1';
    const last_login_date = new Date();

    await userModel.createUser(username, name, email, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username2, name2, email, last_login_ip, last_login_date, passhash);
    await userModel.createUser(username3, name3, email, last_login_ip, last_login_date, passhash);

    await userModel.followUser(username2, username);

    let result = await userModel.getPeopleThatFollowUser(username);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ username: username2, name: name2 });

    await userModel.followUser(username3, username);

    result = await userModel.getPeopleThatFollowUser(username);
    expect(result).toHaveLength(2);
    expect(result).toMatchObject([
      { username: username2, name: name2 },
      { username: username3, name: name3 },
    ]);
  });

});
