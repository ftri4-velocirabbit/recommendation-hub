const { Router } = require('express');

const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { createSession } = require('./../controllers/sessionController');
const { setCookie } = require('./../controllers/cookieController');

const router = Router();

router.get('/',
  getUser,
  (req, res) => {
    res.status(200).json({ user: res.locals.foundUser });
  }
);

router.post('/',
  createUser,
  createSession,
  setCookie,
  (req, res, next) => {
    if (res.locals.error) return res.status(401).json({ error: res.locals.error });
    if (!res.locals.user) return next(new Error('Failed to create user in database.'));
    if (!res.locals.session) return next(new Error('User created, but session was not set.'));

    return res.json({ user: res.locals.user });
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
