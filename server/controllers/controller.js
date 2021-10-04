const db = require('../models/models')
const controller = {};

// controller.getUsers = (req, res, next) => {
//   const query = //`SELECT * FROM people;`
//   `SELECT  *
//   FROM 
//     user_table
//   ;`;
//   // 🐱‍👤🐱‍👤🐱‍👤 sneaking into your code
//   db.query(query)
//     .then(dbres => {
//       res.locals.users = dbres.rows;
//       return next();
//     })
//     .catch((err)=>{
//       console.log(err.stack);
//       const errObj = {
//         log: 'Unknown db error',
//         status: 500,
//         message: { err: 'An error occurred' },
//       };
//       return next(errObj);
//     });
// };

//-----attemptLogin----//
controller.attemptLogin = (req, res, next) => {
  let username = req.body.userNameLogin;
  let password = req.body.passwordLogin;

  // check to makesure username and password are defined before querying the DB
  const query = {
    text: `SELECT *
  FROM user_table
  WHERE user_name = $1
  AND password = $2`,
   values: [username, password],
  };

  db.query(query)
  .then(dbres => {
    console.log('the SQL database says:', dbres.rows);
    res.locals.user = dbres.rows;
    res.locals.group = dbres.rows[0].group_name;
    //console.log(res.locals.user);
      if (res.locals.user.length !== 1) {
        return next({
          log: 'controller.attemptLogin: ERROR invalid username/password',
          message: {
            err: 'Error: check logs for more details'
          }
        });
      }
    next();
  })
  .catch(err => next({
    log: `controller.attemptLogin: ERROR: ${err.message}`,
    message: { err: 'controller.attemptLogin: ERROR: Check server logs for details' }
  })
)};


//----checkIfUserExists ----//
controller.checkIfUserExists = (req, res, next) => {
  //get necessary info from the req body
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

    // make sure these parameters exist
    if (!username || !password || !firstName || !lastName) {
      return next({
        log: 'controller.createUser: ERROR invalid username/password',
        message: {
          err: 'Error: check logs for more details'
        }
      });
    }

  // make sure an entry doesn't already exist in the DB
  const query = {
    text: `SELECT *
  FROM user_table
  WHERE user_name = $1`,
   values: [username],
  };

  db.query(query)
  .then(dbres => {
    if (dbres.length === 0) {
      return next({
        log: 'controller.checkIfUserExists: ERROR user not found in database',
        message: {
          err: 'Error: check logs for more details'
        }
      });
    }
    return next();
  })
  .catch((err)=>{
    const errObj = {
      log: 'Unknown db error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    return next(errObj);
  });
}
  
//------createUser-----//
controller.createUser = (req, res, next) => {
  const username = req.body.userNameLogin;
  const password = req.body.passwordLogin;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  
  const createUserQuery = {
    text: `INSERT INTO user_table (first_name, last_name, user_name, password)
  VALUES ($1, $2, $3, $4);`,
   values: [firstName, lastName, username, password],
  };

  db.query(createUserQuery)
    .then(dbres => {
      res.locals.user = dbres.rows;
      return next();
    })
    .catch(err => next({
      log: `controller.createUser: ERROR: ${err.message}`,
      message: { err: 'controller.createUser: ERROR: Check server logs for details' }
    }))
}

//----joinGroup----//
controller.joinGroup = (req, res, next) => {
  const groupName = req.body.inputGroup;
  const username = req.body.username;

  const query = {
    text: `UPDATE user_table SET group_name=$1 WHERE user_name=$2`,
    values: [groupName, username],
  };
  res.locals.group = groupName;
  db.query(query)
    .then(() => next())
    .catch(err => next({
      log: `controller.joinGroup: ERROR: ${err.message}`,
      message: { err: 'controller.joinGroup: ERROR: Check server logs for details' }
    }))
 }

//---rateMovie----??
controller.rateMovie = (req, res, next) => {
  const movieName = req.body.movieTitle;
  const starRating = req.body.rating;
  const username = req.body.username;
  const genre = req.body.genre;

  const query = {
    text: `INSERT INTO movie_opinion_table (movie_name, star_rating, user_name, genre)
    VALUES ($1, $2, $3, $4);`,
    values: [movieName, starRating, username, genre],
  };

  db.query(query)
  .then(dbres => {
    res.locals
    return next();
  })
  .catch(err => next({
    log: `controller.rateMovie: ERROR: ${err.message}`,
    message: { err: 'controller.rateMovie: ERROR: Check server logs for details' }
  }))
}

// ---getUserGroup---///
controller.getUserGroup = (req, res, next) => {
  const username = req.body.userNameLogin;
  const query = {
    text: `SELECT group_name FROM user_table WHERE user_name = $1`,
    values: [username],
  };
  db.query(query)
  .then((dbres) => {
    res.locals.group = dbres.rows[0].group_name;
    console.log('The group is:', res.locals.group)
    return next();
    })
    .catch(err => next({
      log: `controller.getUserGroup: ERROR: ${err.message}`,
      message: { err: 'controller.getUserGroup: ERROR: Check server logs for details' }
    }))
 }

//-----getDisplayData ------//
controller.getDisplayData = (req, res, next) => {
  let group = res.locals.group;

  
  //if they aren't a member of a group yet, then send back empty data
  const query = {
    text: `SELECT AVG(star_rating) AS avg_rating, movie_name, COUNT(star_rating) AS total_reviews, genre FROM movie_opinion_table 
    WHERE movie_opinion_table.user_name IN (SELECT user_name FROM user_table WHERE group_name=$1)
    GROUP BY movie_name, genre`,
   values: [group],
  }; //get all the movie ratings from the movie opinion table where the user_name has a group_name = Group
  // SELECT * from movie_opinion

  db.query(query)
  .then(dbres => {
    res.locals.displayData = dbres.rows;
    console.log(res.locals.displayData);
    return next();
  })
  .catch(err => next({
    log: `controller.getDisplayData: ERROR: ${err.message}`,
    message: { err: 'controller.getDisplayData: ERROR: Check server logs for details' }
  })
)};

module.exports = controller;
