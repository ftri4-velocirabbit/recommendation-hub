const databaseModel = require('./models/databaseModel');
const userModel = require('./models/userModel');
const sessionModel = require('./models/sessionModel');
const recommendationModel = require('./models/recommendationModel');
const categoryModel = require('./models/categoryModel');

(async () => {
  // await databaseModel.destroyDatabase();
  // await databaseModel.initDatabase();

  await categoryModel.deleteCategories();

  // let recommendation;
  // recommendation = await recommendationModel.createRecommendation(
  //   'hello',
  //   'hi',
  //   new Date(),
  //   'movies',
  //   5
  // );
  // console.log(recommendation);

  // let user;
  // user = await userModel.createUser('miguel', 'Miguel Hernandez', 'miguelh72@gmail.com', '127.0.0.1', new Date(), 'coolpassword');
  // //user = await userModel.readUser('miguel');
  // //user = await userModel.updateUser('miguel', 'Not Miguel', 'not my email', '128.0.0.1', new Date('1992-03-19'));

  // let session;
  // session = await sessionModel.createSession(user.username, new Date());
  // session = await sessionModel.readSession(session.id);

  // console.log(session);

  // session = await sessionModel.updateSession(session.id, new Date('1992-03-19'));

  // console.log(session);

  // // console.log('Deleted session? ', await sessionModel.deleteSession(session.id));
  // // console.log('Deleted user? ', await userModel.deleteUser('miguel'));
})();
