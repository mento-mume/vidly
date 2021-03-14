const winston = require('winston');
require('winston-mongodb');
const logger = require('../utils.js/logger');
module.exports = function(){ 
    process.on('uncaughtException', (err)=>{
       logger.error(err,err);
       process.exit(1);
    });

    process.on('unhandledRejection', (err)=>{
        logger.error(err,err);
        process.exit(1);
     });
}