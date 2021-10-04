const db = require('../models/models')
const controller = {};

controller.getUsers = (req, res, next) => {
  const query = //`SELECT * FROM people;`
  `SELECT  *
  FROM 
    user_table
  ;`;
  // 🐱‍👤🐱‍👤🐱‍👤 sneaking into your code
  db.query(query)
    .then(dbres => {
      // console.log(dbres.rows);
      res.locals.users = dbres.rows;
      return next();
    })
    .catch((err)=>{
      console.log(err.stack);
      const errObj = {
        log: 'Unknown db error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      return next(errObj);
    });
};

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
    res.locals.user = dbres.rows;
      if (res.locals.user.length !== 1) {
        return next({
          log: 'controller.attemptLogin: ERROR invalid username/password',
          message: {
            err: 'Error: check logs for more details'
          }
        });
      // } else if (res.locals.user.length > 1) {
      //   return next({
      //     log: 'controller.attemptLogin: ERROR duplicate user found',
      //     message: {
      //       err: 'Error: check logs for more details'
      //     }
      //   });
      }
    next()
  })
  .catch(err => next({
    log: `controller.attemptLogin: ERROR: ${err.message}`,
    message: { err: 'controller.attemptLogin: ERROR: Check server logs for details' }
  })
)};


controller.signUp = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  }













controller.getSpecies = (req, res, next) => {
  // write code here
  const id = [req.query.id];
  const query = `SELECT s.name, s.classification, s.average_height, s.average_lifespan, s.language, p.name AS homeworld
                FROM species s
                LEFT JOIN planets p ON s.homeworld_id = p._id
                WHERE s._id=$1;`;
  db.query (query, id)
    .then(data => {
      res.locals.species = data.rows[0];
      //console.log(res.locals.species);
      return next();
    })
    .catch((e) => {
      console.error(e.stack);
      const errObj = {
        log: 'Unknown db error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      return next(errObj);
      
    });
};

controller.getHomeworld = (req, res, next) => {
  // write code here
  const id = [req.query.id];
  //Write a SQL query to get the planet's rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, and population.
  const query = `SELECT p.name, p.rotation_period, p.orbital_period, p.diameter, p.climate, p.gravity, p.terrain, p.surface_water, p.population
                 FROM planets p
                 WHERE p._id=$1;`;
  db.query (query, id)
    .then(data => {
      res.locals.homeworld = data.rows[0];
      //console.log(res.locals.species);
      return next();
    })
    .catch((e) => {
      console.error(e.stack);
      const errObj = {
        log: 'Unknown db error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      return next(errObj);
    });
};

controller.getFilm = (req, res, next) => {
  // write code here

  next();
};

controller.addCharacter = (req, res, next) => {
  // write code here
  const userInfo = req.body;
  console.log(userInfo);
  const query = `INSERT INTO people (name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height)
                VALUES ('${userInfo.name}', ${userInfo.mass}, '${userInfo.hair_color}', '${userInfo.skin_color}', '${userInfo.eye_color}', ${userInfo.birth_year}, 
                      '${userInfo.gender}', ${userInfo.species_id}, ${userInfo.homeworld_id}, ${userInfo.height})
                RETURNING *;`;
  db.query (query)
    .then(data => {
      res.locals.addNew = data.rows[0];
      console.log(res.locals.addNew);
      return next();
    })
    .catch((e) => {
      console.error(e.stack);
      const errObj = {
        log: 'Unknown db error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      return next(errObj);
                  
    });
};

module.exports = controller;
