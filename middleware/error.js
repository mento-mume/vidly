const winston = require('winston');
require('winston-mongodb');

const logger = require('../utils.js/logger');
module.exports = function(err,req,res,next){
    logger.error(err.message, err);
    res.status(500).send('something failed')
}