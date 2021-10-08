const { pool } = require('./setup.js');

const { createCategory } = require('./categoryModel');
const { createUser } = require('./userModel');
const { createRecommendation } = require('./recommendationModel');

const CATEGORIES = require('./../../shared/categories.json');

/**
 * Initialize all database tables. Must be used on a database without matching tables. Call `destroyDatabase` first if needed.
 */
async function initDatabase(fillCategories = true) {
  await pool.query(`
      CREATE TABLE categories(
      name VARCHAR NOT NULL PRIMARY KEY
      );
    `, []);

  if (fillCategories) await Promise.all(CATEGORIES.map((category) => createCategory(category)));

  await pool.query(`
    CREATE TABLE users(
      username VARCHAR NOT NULL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      passhash VARCHAR NOT NULL,
      last_login_ip VARCHAR NOT NULL,
      last_login_date TIMESTAMP NOT NULL
    );
  `, []);

  const asyncQueries = [];

  asyncQueries.push(pool.query(`
    CREATE TABLE recommendations(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      title VARCHAR NOT NULL,
      body VARCHAR NOT NULL,
      date TIMESTAMP NOT NULL,
      category VARCHAR,
      rating INT NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (category) REFERENCES categories(name)
    );
  `, []));

  asyncQueries.push(pool.query(`
    CREATE TABLE user_follows(
      id VARCHAR NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      followed_username VARCHAR NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username),
      FOREIGN KEY (followed_username) REFERENCES users(username)
    );
  `, []));

  asyncQueries.push(pool.query(`
    CREATE TABLE sessions(
      id SERIAL NOT NULL PRIMARY KEY,
      username VARCHAR NOT NULL,
      expires TIMESTAMP NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username)
    );
  `, []));

  await Promise.all(asyncQueries);
}

/**
 * Drop all database tables. Can be used with partially created database.
 */
async function destroyDatabase() {
  try {
    await pool.query(`
      DROP TABLE sessions;
    `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE user_follows;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE user_recommendations;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE recommendations;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE users;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }

  try {
    await pool.query(`
    DROP TABLE categories;
  `, []);
  } catch (_) {
    // its okay if it doesn't exist, calm down
  }
}

/**
 * Fill database with some test data.
 */
async function prefillDatabase() {
  const passhash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa';
  const lastLoginDate = new Date();
  const lastLoginIp = '127.0.0.1';
  const users = [
    { username: 'adam', name: 'Adam Sheff', email: 'adam@gmail.com' },
    { username: 'ali', name: 'Ali', email: 'ali@gmail.com' },
    { username: 'angylynn', name: 'Angelyn Truong', email: 'angyltnn@gmail.com' },
    { username: 'anne', name: 'Anne Chan', email: 'ann@gmail.com' },
    { username: 'clinton', name: 'Clinton Quach', email: 'clinton@gmail.com' },
    { username: 'conrad', name: 'Conrad Friesen', email: 'conrad@gmail.com' },
    { username: 'daniel', name: 'Daniel', email: 'daniel@gmail.com' },
    { username: 'danni', name: 'Danni Denmark', email: 'danni@gmail.com' },
    { username: 'duke', name: 'Duke Lee', email: 'duke@gmail.com' },
    { username: 'dustin', name: 'Dustin Jones', email: 'dustin@gmail.com' },
    { username: 'elijah', name: 'Elijah Tang', email: 'elijah@gmail.com' },
    { username: 'graham', name: 'Graham Albachten', email: 'graham@gmail.com' },
    { username: 'grisha', name: 'Gregory Levine-Rozenvayn', email: 'grisha@gmail.com' },
    { username: 'gunnar', name: 'Gunnar Marino', email: 'gunnar@gmail.com' },
    { username: 'isaiah', name: 'Isaiah Delgado', email: 'isaiah@gmail.com' },
    { username: 'jackie', name: 'Jackie Withworth', email: 'jackie@gmail.com' },
    { username: 'jacob', name: 'Jacob Davis', email: 'jacob@gmail.com' },
    { username: 'jason', name: 'Jason de Vera', email: 'jason@gmail.com' },
    { username: 'justin', name: 'Justin Stoddard', email: 'justin@gmail.com' },
    { username: 'kaden', name: 'Kaden Johnson', email: 'kaden@gmail.com' },
    { username: 'katrina', name: 'Katrina Villanueva', email: 'katrina@gmail.com' },
    { username: 'khandker', name: 'Khandker', email: 'khandker@gmail.com' },
    { username: 'kyle', name: 'Kyle Combs', email: 'kyle@gmail.com' },
    { username: 'kyo', name: 'Kyo Ku', email: 'kyo@gmail.com' },
    { username: 'miguel', name: 'Miguel Hernandez', email: 'miguel@gmail.com' },
    { username: 'nancy', name: 'Nancy Kousholt', email: 'nancy@hotmail.com' },
    { username: 'nisa', name: 'Nisa Lintakoon', email: 'nisa@hotmail.com' },
    { username: 'parker', name: 'Parker Hutcheson', email: 'parker@gmail.com' },
    { username: 'sebastien', name: 'Sebastien Faque', email: 'sebastien@gmail.com' },
    { username: 'phillip ', name: 'Phillip Troutman', email: 'phillip@gmail.com' },
    { username: 'reland', name: 'Reland Boyle', email: 'reland@gmail.com' },
    { username: 'victoria', name: 'Victoria Armada', email: 'victoria@gmail.com' },
    { username: 'vince', name: 'Vince Nguyen', email: 'vince@gmail.com' },
  ];

  // Create users
  await Promise.all(users.map(user => createUser(user.username, user.name, user.email, lastLoginIp, lastLoginDate, passhash)));

  // Create recommendations
  const recommendation = [
    { title: 'Shrek', body: 'Best movie known to man and woman.', category: 'Movies', rating: 5 },
    { title: 'Cheeseburgers', body: 'What is there to complain about? Meat? Good. Buns? Good. Cheese? Goooood.', category: 'Food', rating: 5 },
    { title: 'Sorting algorithm', body: 'Merge sort is the king for quick implementations, but I hear quicksort has better performance for most inputs.', category: 'Algorithms', rating: 5 },
    { title: 'Brussel Sprouts', body: 'God, why.', category: 'Food', rating: 0 },
    { title: 'Sims4', body: 'Not only can I be a millionaire, slap anyone I want, put as many bathrooms in my house as I want.. I can also put my Sim in a pool, take out the ladder and watch it die slowly. Minus one point because the sim does know how to use the bathroom.', category: 'Games', rating: 4 },
    { title: 'Lord of the Rings', body: 'Was there only one ring?', category: 'Movies', rating: 3 },
    { title: 'Friday', body: 'Can not believe I listened to that with my own two ears.', category: 'Music', rating: 0 },
    { title: 'Wall of China', body: 'It is a wall... why should I be impressed. Back in my days, the walls were more beautiful and they did not have to be so tall. And why is it so long? I did not feel that good that day and my wife really wanted to visit it. Well I go too tired and collasped. The ambulance took 3 hours to drive down the whole length of the wall to get to me. I could have died. I failed in front of my wife because of this wall. I COULD HAVE DIED BECAUSE OF THIS WALL. I will never come back here. 1 star, due to my dehydration, I got a bit of attention from my wife.', category: 'Travel', rating: 1 },
    { title: 'Searching an ordered list', body: 'Binary search all the way!', category: 'Algorithms', rating: 5 },
    { title: 'Twilight', body: '0/10 no recommend', category: 'Movies', rating: 0 },
    { title: 'Monopoly', body: 'Thought it was be a nice way to spend some quality time with the family. We had dinner while playing, finished a movie while playing. My new born child has since graduated college... this game never ends.', category: 'Games', rating: 2 },
    { title: 'Depth first or breadth first?', body: 'Depth first for exhaustive searches due to coding simplicity, but breadth first for quickest route. Plus, who doesn\'t love a stack of pancakes?', category: 'Algorithms', rating: 5 },
    { title: 'Space Engineers', body: 'Space Engineers is a voxel-based sandbox game, developed and published by Czech independent developer Keen Software House.', category: 'Games', rating: 4 },
    { title: 'Cauliflower crust pizza', body: 'To be fair, I don\'t eat pizza for its health benefits, I eat it because I love cheese and bread and it makes me happy. It\'s also a crowd-pleaser, which means no hour-long debate with my husband over where to order takeout from. That said, I absolutely jumped at the thought of a "healthy" pizza option when cauliflower crust first came on the market. The verdict? Watery, tasteless, and disappointing, much like cauliflower rice.', category: 'Food', rating: 3 },
    { title: 'Visit miami!', body: 'Get a taste of Cuban culture. Set sail on the Atlantic Ocean. Let loose in the lap of luxury.', category: 'Travel', rating: 5 },
    { title: 'Tequila', body: 'I have trouble reading the lyrics when karaoke-ing. This is the best song when you\'ve got an audience because the lyrics are so easy to remember. The only complaint is I can never remember what happens after I finish singing this song.', category: 'Music', rating: 4 },
    { title: 'Chocolate Lava Cake', body: 'This decadent, heavenly, creamy, pillowy soft, melts on your tongue source of happiness is a godsend.', category: 'Food', rating: 5 },
    { title: 'Never Gonna Give You Up', body: 'This is a good song. But why does it keep playing whenever I try to look at adult content?', category: 'Music', rating: 2 },
  ];

  // Create
  const MAX_NUM_REC = 5;
  for (const user of users) {
    const userRecommendations = [];
    // pick a random number of recommendations for this users
    for (let i = 0; i < Math.floor(Math.random() * MAX_NUM_REC + 1); i++) {
      userRecommendations.push(recommendation[Math.floor(Math.random() * recommendation.length)]);
    }

    // create recommendations
    await Promise.all(
      userRecommendations.map(rec => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 10));
        date.setHours(date.getHours() - Math.floor(Math.random() * 24));
        date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));

        return createRecommendation(user.username, rec.title, rec.body, date, rec.category, rec.rating);
      })
    );
  }
}

module.exports = { initDatabase, destroyDatabase, prefillDatabase };
