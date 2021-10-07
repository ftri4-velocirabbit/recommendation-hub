const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const app = express();


/* MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());


/* ROUTES */

app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


/* GLOBAL 404 */
// TODO build and serve global 404 page


/* GLOBAL ERROR HANDLER */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err);

	const defaultClientError = {
		status: 500,
		message: { error: 'Unknown server error. Please check server log.' },
	};
	const clientError = Object.assign(defaultClientError, err);
	res.status(clientError.status).send(JSON.stringify(clientError.message));
});


/* INIT SERVER */

// TODO remove database wipe
const databaseModel = require('./models/databaseModel');
databaseModel.destroyDatabase()
	.then(() => databaseModel.initDatabase())
	.then(() => databaseModel.prefillDatabase())
	.then(() => app.listen(PORT, HOST, () => console.log(`Server listening on http://${HOST}:${PORT}`)));

// app.listen(PORT, HOST, () => console.log(`Server listening on http://${HOST}:${PORT}`))

module.exports = app;
