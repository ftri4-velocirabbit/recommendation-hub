const { Router } = require('express');

const userRouter = require('./user');
const searchRouter = require('./search');
const profileRouter = require('./profile');
const feedRouter = require('./feed');
const recommendationRouter = require('./recommendation');

const router = Router();

router.use('/user', userRouter);
router.use('/search', searchRouter);
router.use('/profile', profileRouter);
router.use('/feed', feedRouter);
router.use('/recommendation', recommendationRouter);

module.exports = router;
