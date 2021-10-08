const {
  searchRecommendations,
  createRecommendation,
  updateRecommendation: dbUpdateRecommendation,
  readRecommendation,
  deleteRecommendation: dbDeleteRecommendation,
} = require('./../models/recommendationModel');
const { getPeopleUserFollows } = require('./../models/userModel');

/**
 * Middleware: If successful, sets `res.locals.feed` to an array of Recommendation objects with 
 * { id, username, name, title, body, date, category, rating } schema.
 */
async function getFeed(req, res, next) {
  if (!res.locals.session) return next();

  const followedUsers = await getPeopleUserFollows(res.locals.session.username);

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

/**
 * Middleware: If successful, sets `res.locals.recommendations` to an array of front-end schema Recommendation objects from the user.
 */
async function getUserRecommendations(req, res, next) {
  if (!res.locals.session) return next();

  const recommendations = await searchRecommendations(res.locals.session.username);

  res.locals.recommendations = recommendations.map(rec => ({
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

/**
 * Middleware: Boolean set at `res.locals.dbStatus` will indicate if the database create was successful.
 */
async function saveRecommendation(req, res, next) {
  if (!res.locals.session) return next();

  const { title, body, category, rating } = req.body;
  if (typeof title !== 'string'
    || typeof body !== 'string'
    || typeof category !== 'string'
    || typeof rating !== 'number'
  ) return next({
    status: 400,
    error: 'Request body was not formatted correctly.'
  });

  const result = await createRecommendation(res.locals.session.username, title, body, new Date(), category, rating);
  res.locals.dbStatus = typeof result === 'object';
  return next();
}

/**
 * Middleware: Boolean set at `res.locals.dbStatus` will indicate if the database update was successful.
 */
async function updateRecommendation(req, res, next) {
  if (!res.locals.session) return next();
  if (!req.params.id) return next(new Error('Middleware reached without id parameter.'));

  req.params.id = decodeURIComponent(req.params.id);

  const { title, body, category, rating } = req.body;
  if ((title && typeof title !== 'string')
    || (body && typeof body !== 'string')
    || (category && typeof category !== 'string')
    || (rating && typeof rating !== 'number')
  ) return next({
    status: 400,
    error: 'Request body was not formatted correctly.'
  });

  const recommendation = await readRecommendation(req.params.id);
  if (!recommendation) {
    res.locals.dbStatus = false;
    return next();
  }
  if (title) recommendation.title = title;
  if (body) recommendation.body = body;
  if (category) recommendation.category = category;
  if (rating) recommendation.rating = rating;

  const result = await dbUpdateRecommendation(
    recommendation.id,
    recommendation.title,
    recommendation.body,
    new Date(),
    recommendation.category,
    recommendation.rating
  );
  res.locals.dbStatus = typeof result === 'object';
  return next();
}

async function deleteRecommendation(req, res, next) {
  if (!res.locals.session) return next();
  if (!req.params.id) return next(new Error('Middleware reached without id parameter.'));

  req.params.id = decodeURIComponent(req.params.id);

  res.locals.dbStatus = await dbDeleteRecommendation(req.params.id);
  return next();
}

module.exports = {
  getFeed,
  getUserRecommendations,
  saveRecommendation,
  updateRecommendation,
  deleteRecommendation
};
