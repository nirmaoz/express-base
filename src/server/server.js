/**
 * This server:
 * 1. Serves static files from /src/client on route '/'
 * 2. Handle requests for '/json'
 */

const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const asyncMiddleware = require('./utils/asyncMiddleware');
const {handleRequest, handleRequestError} = require('./utils/requestHandler');

const app = express();
const args = process.argv.slice(2);
const port = args[0] || '3000';

app.use(compression()); //Compress all routes
app.use(helmet()); //set appropriate HTTP headers that help protect from well-known web vulnerabilities
app.use(express.static(path.join(__dirname, '../client/build'))); // Serve static client files

/**
 * Handle request for /json
 */
app.get('/json', asyncMiddleware(async (req, res) => {
    try{
        await handleRequest(req, res);
    } catch (error) {
        handleRequestError(res, error);
    }
}));

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
