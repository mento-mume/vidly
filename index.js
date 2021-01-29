const mongoose =require('mongoose')
const genres = require('./Routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
    .then(()=>console.log('connected to mongodb....'))
    .catch(err => console.error('Could not connect to Mongodb...',err));


app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));