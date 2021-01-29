
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const genreSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});
const Genre = new mongoose.model('Genre',genreSchema);
//get
router.get('/',async (req,res)=>{
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

//post
router.post('/',async (req,res)=>{
    //validate input
    const {error} = validateGenre(req.body);
    if(error) res.status('400').send(error.details[0].message);
    
  
    let genre = new Genre({name: req.body.name});
    genre= await genre.save();
    res.send(genre);

});
//put
router.put('/:id',async (req,res)=>{
    const {error} = validateGenre(req.body);
    if(error) res.status('400').send(error.details[0].message);

   const genre =await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

    if(!genre) return res.status('404').send('the genre with the id could not be found');
 
    res.send(genre);

});
//delete
router.delete('/:id',async (req,res)=>{
    const genre =await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status('404').send('the genre with the id could not be found');

    res.send(genre);
});

router.get('/',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status('404').send('the genre with the id could not be found');
    res.send(genres);
});

function validateGenre(genre){

    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(genre);
}

module.exports =router;