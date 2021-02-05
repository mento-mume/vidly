const mongoose = require('mongoose');
const Joi  = require('joi');


const Rental = mongoose.model('Rental', new mongoose.Schema({

    customer: {
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength: 50
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength:50
            }
        }),
        required: true
    },
    movie:{
        type:  new mongoose.Schema({
            title:{
                type:String,
                required: true,
                trim: true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate: {
                type:Number,
                required:true,
                minlength:0,
                maxlength:255
            }
        }),
        required: true
    },
    dateOut:{
        type:Date,
        required:true,
        default: Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }
}));

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.String().required(),
        movieId:  Joi.String().required()
    });      
    return schema.validate(rental); 
    };

exports.Rental = Rental;
exports.validateRental = validateRental;