const { Router } = require('express');

const { verifyUser, getUserProfile, followUser, unfollowUser } = require('./../controllers/userController');

const router = Router();

/** 
 * Route used to obtain a user's profile information
 */
router.get('/:username',
  // todo verify user
  getUserProfile,
  (req, res) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.local.foundUser) return res.status(404).json({
      error: 'User does not exist.'
    });

    return res.json(res.locals.foundUser);
  }
);

/**
 * Route used to follow a user.
 */
router.post('/:username',
  // todo verify user
  followUser,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.dbStatus) return res.status(400).json({
      error: 'Failed to follow user.'
    });
    if (!res.locals.followedUsers) return next(
      new Error('Route reached with authorized user and good database access but res.locals.followedUsers was not returned.')
    );

    return res.json({ followedUsers: res.locals.followedUsers });
  }
);

/**
 * Route used to follow a user.
 */
router.delete('/:username',
  // todo verify user
  unfollowUser,
  (req, res, next) => {
    if (!res.locals.user) return res.status(401).json({
      error: 'User is not authorized.'
    });
    if (!res.locals.dbStatus) return res.status(400).json({
      error: 'Failed to follow user.'
    });
    if (!res.locals.followedUsers) return next(
      new Error('Route reached with authorized user and good database access but res.locals.followedUsers was not returned.')
    );

    return res.json({ followedUsers: res.locals.followedUsers });
  }
);

module.exports = router;
