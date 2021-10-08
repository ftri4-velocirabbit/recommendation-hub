const { Router } = require('express');

const { searchUsers } = require('../controllers/userController');
const { findSession } = require('./../controllers/sessionController');
const { getCookie } = require('./../controllers/cookieController');

const router = Router();

router.get('/:term',
  getCookie,
  findSession,
  searchUsers,
  (req, res, next) => {
    if (!res.locals.session) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.users) return next(new Error('Route reached with authorized user but nothing set in res.locals.user'));

    return res.json({ users: res.locals.users });
  }
);

module.exports = router;
