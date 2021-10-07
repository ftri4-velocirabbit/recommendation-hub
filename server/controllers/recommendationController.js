const { searchRecommendations } = require('./../models/recommendationModel');
const { getFollowed } = require('./../models/userModel');

/**
 * Middleware: If successful, sets `res.locals.feed` to an array of Recommendation objects with 
 * { id, username, name, title, body, date, category, rating } schema.
 */
async function getFeed(req, res, next) {
  if (!res.locals.user) return next();

  const followedUsers = await getFollowed(res.locals.user.username);

  let recommendations = [];
  for (const user of followedUsers) {
    recommendations.push(...(await searchRecommendations(user.username)));
  }

  // convert to front-end Recommendation schema
  res.locals.feed = recommendations.map(rec => ({
    id: rec.id,
    title: rec.title,
    body: rec.body,
    rating: rec.rating,
    category: rec.category,
    date: rec.date,
    owner: {
      name: rec.name,
      username: rec.username,
    },
  }));
  return next();
}

module.exports = {
  getFeed,
};
