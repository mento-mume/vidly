const winston = require('winston');

module.exports = logger = winston.createLogger({
        transports: [
            new winston.transports.Console({colorize:true,prettyPrint:true}),
            new winston.transports.File({filename:'filelog.log'}), 
            new winston.transports.MongoDB({db:'mongodb://localhost/vidly'}) 
        ]
        });



