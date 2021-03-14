require('express-async-errors'); 
const winston = require('winston');
//const logger = require('./utils/logger');
const express = require('express');
const app = express();



require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')()
require('./startup/validate')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));