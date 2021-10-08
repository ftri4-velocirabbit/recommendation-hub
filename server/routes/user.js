const { Router } = require('express');

const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { createSession, findSession } = require('./../controllers/sessionController');
const { getCookie, setCookie } = require('./../controllers/cookieController');

const router = Router();

router.get('/',
  getCookie,
  findSession,
  getUser,
  (req, res, next) => {
    if (!res.locals.session) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (res.locals.session && !res.locals.user) return next(new Error(
      'Session was found but could not load user.'
    ));

    res.status(200).json({
      user: res.locals.user,
      followedUsers: res.locals.followedUsers,
      followers: res.locals.followers,
    });
  }
);

router.post('/',
  createUser,
  createSession,
  setCookie,
  getUser,
  (req, res, next) => {
    if (res.locals.error) return res.status(401).json({ error: res.locals.error });
    if (!res.locals.user) return next(new Error('Failed to create user in database.'));
    if (!res.locals.session) return next(new Error('User created, but session was not set.'));

    return res.json({
      user: res.locals.user,
      followedUsers: res.locals.followedUsers,
      followers: res.locals.followers
    });
  }
);

router.patch('/:username',
  updateUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.delete('/:username',
  deleteUser,
  (req, res) => {
    if (res.locals.deletedSession) {
      res.status(401).json({ error: 'your session has expired' });
    } else {
      res.status(200).json(res.locals.deletedUser);
    }
  }
);

module.exports = router;
