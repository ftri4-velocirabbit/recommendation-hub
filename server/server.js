const express = require('express');
const apiRouter = require('./routes/routes');
const path = require('path')
// path, Controllers, Routers

//connect to the SQL DB

const app = express();
const PORT = 3000; 

// handle parsing request body
app.use(express.json());
console.log(path.resolve(__dirname, '../build'));
app.use('/build',express.static(path.resolve(__dirname, '../build')));


app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../index.html'));
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/api', apiRouter);


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// global error event handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error', 
        status: 400,
        message: {err: 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
});

// module.exports = app;