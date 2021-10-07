const { Router } = require('express');

const { verifyUser } = require('./../controllers/userController');
const {
  getUserRecommendations,
  saveRecommendation,
  updateRecommendation,
  deleteRecommendation
} = require('./../controllers/recommendationController');

const router = Router();

router.get('/',
  // todo verifyUser,
  getUserRecommendations,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.local.recommendations) return next(new Error('Route reached with authorized user and but res.local.recommendations was not set.'));

    return res.json(res.local.recommendations);
  }
);

router.post('/',
  // todo verifyUser,
  saveRecommendation,
  getUserRecommendations,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.dbStatus) return res.status(400).json({
      error: 'Failed to create recommendation.'
    });
    if (!res.local.recommendations) return next(new Error('Route reached with authorized user and but res.local.recommendations was not set.'));

    return res.json(res.local.recommendations);
  }
);

router.patch('/:id',
  // todo verifyUser,
  updateRecommendation,
  getUserRecommendations,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.dbStatus) return res.status(400).json({
      error: 'Failed to update recommendation.'
    });
    if (!res.local.recommendations) return next(new Error('Route reached with authorized user and but res.local.recommendations was not set.'));

    return res.json(res.local.recommendations);
  }
);

router.delete('/:id',
  // todo verifyUser,
  deleteRecommendation,
  getUserRecommendations,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.dbStatus) return res.status(400).json({
      error: 'Failed to delete recommendation.'
    });
    if (!res.local.recommendations) return next(new Error('Route reached with authorized user and but res.local.recommendations was not set.'));

    return res.json(res.local.recommendations);
  }
);

module.exports = router;
