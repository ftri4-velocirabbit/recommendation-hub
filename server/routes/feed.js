const { Router } = require('express');

const { getFeed } = require('./../controllers/recommendationController');
const { findSession } = require('./../controllers/sessionController');
const { getCookie } = require('./../controllers/cookieController');

const router = Router();

router.get('/',
  getCookie,
  findSession,
  getFeed,
  (req, res, next) => {
    if (!res.locals.session) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.feed) return next(new Error('Route reached with authorized user but nothing set in res.locals.feed'));

    return res.json({ recommendations: res.locals.feed });
  }
);

module.exports = router;
