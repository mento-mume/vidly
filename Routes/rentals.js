const {Rental, validateRental} = require('../models/rental');
const {Movie} = require('../models/movie')
const {Customer}= require ('../models/customer');
const mongoose = require ('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);
router.get('/', async  (req, res)=> {
    const rental = await rental.find().sort('-dateOut');
    res.send(rental);
});

router.post('/',async (req,res) =>{
    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId); 
    if (!customerId) return res.status(400).send('invalid customer Id');

    const movie = await Rental.findById(req.body.movieId);
    if (!movie) return res.status(400).send('invalid movie Id');

    if (movie.numberInStock === 0) return res.status(400).send('movie not in stock'); 

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone:customer.phone
        },
        movie:{
            _id: movie._id,
            title:movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
        .save('rentals',rental)
        .update('movies',movie, {_id:movie._id},{
            $inc:{
                numberInStock: -1
            }
        })
        .run()
    } catch (ex) {
        res.status(500).send('something went wrong');
    }
    res.send(rental);
});
    router.put('/:id',async (req,res)=>{
        const {error} = validateRental(req.body);
        if(error) res.status('400').send(error.details[0].message);
    
       const rental =await Rental.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    
        if(!rental) return res.status('404').send('the rental with the id could not be found');
     
        res.send(rental);
    
    });
    //delete
    router.delete('/:id',async (req,res)=>{
        const rental =await Rental.findByIdAndRemove(req.params.id);
    
        if(!rental) return res.status('404').send('the rental with the id could not be found');
    
        res.send(rental);
    });
    
    router.get('/id:',async (req,res)=>{
        const rental = await Rental.findById(req.params.id);
    
        if(!rental) return res.status('404').send('the rental with the id could not be found');
    
        res.send(rental);
    });
    
   
   module.exports =router;