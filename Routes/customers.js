const {Customer, validateCustomer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

//get
router.get('/',async (req,res)=>{
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

//post
router.post('/',async (req,res)=>{
    //validate input
    const {error} = validateCustomer(req.body);
    if(error) res.status('400').send(error.details[0].message);
  
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold});
    customer = await customer.save();
    res.send(customer);

});
//put
router.put('/:id',async (req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) res.status('400').send(error.details[0].message);

   const customer =await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

    if(!customer) return res.status('404').send('the customer with the id could not be found');
 
    res.send(customer);

});
//delete
router.delete('/:id',async (req,res)=>{
    const customer =await Genre.findByIdAndRemove(req.params.id);

    if(!customer) return res.status('404').send('the customer with the id could not be found');

    res.send(customer);
});

router.get('/id:',async (req,res)=>{
    const customer = await Genre.findById(req.params.id);

    if(!customer) return res.status('404').send('the customer with the id could not be found');

    res.send(customer);
});

module.exports =router;