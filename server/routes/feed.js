const { Router } = require('express');

const { verifyUser } = require('./../controllers/userController');
const { getFeed } = require('./../controllers/recommendationController');

const router = Router();

router.get('/',
  verifyUser,
  getFeed,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.feed) return next(new Error('Route reached with authorized user but nothing set in res.locals.feed'));

    return res.json({ recommendations: res.locals.feed });
  }
);

module.exports = router;
