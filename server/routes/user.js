const { Router } = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.get('/',
  userController.getUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post('/',
  userController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.newUser);
  }
);

router.patch('/:username',
  userController.updateUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.delete('/:username',
  userController.deleteUser,
  (req, res) => {
    if (res.locals.deletedSession) {
      res.status(401).json({ error: 'your session has expired' });
    } else {
      res.status(200).json(res.locals.deletedUser);
    }
  }
);

module.exports = router;
