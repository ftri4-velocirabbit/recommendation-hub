const databaseModel = require('./models/databaseModel');
const userModel = require('./models/userModel');
const sessionModel = require('./models/sessionModel');
const recommendationModel = require('./models/recommendationModel');
const categoryModel = require('./models/categoryModel');

(async () => {
	// await databaseModel.destroyDatabase();
	// await databaseModel.initDatabase();

	// let category;
	// category = await categoryModel.deleteCategories('Food');
	// console.log('deleted', category);

	// let recommendation;
	// recommendation = await recommendationModel.updateRecommendation(
	//   3,
	//   'duke',
	//   'Avengers',
	//   'so cool-ish',
	//   new Date(),
	//   'Movies',
	//   4
	// );
	// recommendation = await recommendationModel.readRecommendation(3);
	// recommendation = await recommendationModel.deleteRecommendation(2);
	// console.log(recommendation);

	// let user;
	// user = await userModel.getFollowers('dukelee4');
	// console.log(user);

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
