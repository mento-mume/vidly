const mongoose =require('mongoose');
const logger = require('../utils.js/logger')
module.exports = function(){
    
mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
    .then(()=>logger.info('connected to mongodb....'));
    

}