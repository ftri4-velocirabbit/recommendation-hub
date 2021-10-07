const { Router } = require('express');

const { searchUsers, verifyUser } = require('./../controllers/userController');
//const {  } = require('./../controllers/cookieController');

const router = Router();

router.get('/:term',
  // TODO add middleware to verify user cookie
  verifyUser,
  searchUsers,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.users) return next(new Error('Route reached with authorized user but nothing set in res.locals.user'));

    return res.json(res.locals.users);
  }
);

module.exports = router;
