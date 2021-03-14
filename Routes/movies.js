const mongoose = require('mongoose');
const express = require('express');
const {Genre} = require('../models/genre');
const {Movie, validateMovie} = require('../models/movie');
const router = express.Router();

//get
router.get('/',async (req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

//post
router.post('/', async (req,res)=>{
    //validate input
    const {error} = validateMovie(req.body);
    if(error) res.status('400').send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre');
    
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);

});
//put
router.put('/:id',async (req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) res.status('400').send(error.details[0].message);

   const movie =await Movie.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

    if(!movie) return res.status('404').send('the movie with the id could not be found');
 
    res.send(movie);

});
//delete
router.delete('/:id',async (req,res)=>{
    const movie =await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status('404').send('the movie with the id could not be found');

    res.send(movie);
});

router.get('/id:',async (req,res)=>{
    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status('404').send('the movie with the id could not be found');

    res.send(movie);
});

module.exports =router;