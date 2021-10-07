const { searchRecommendations } = require('./../models/recommendationModel');
const { getFollowed } = require('./../models/userModel');

/**
 * Middleware: If successful, sets `res.locals.feed` to an array of front-end schema Recommendation objects.
 */
async function getFeed(req, res, next) {
  if (!res.locals.user) return next();

  const followedUsers = await getFollowed(res.locals.user.username);

  let recommendations = [];
  for (const user of followedUsers) {
    recommendations.push(...(await searchRecommendations(user.username)));
  }

  res.locals.feed = recommendations;
  return next();
}

module.exports = {
  getFeed,
};
