import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,'name cannot be empty'],
        minLength: [3,'name must be at least 3 characters long'],
        maxlength: [20,'name can be at most 20 characters long']
    },
    category: {
        type: String,
        required: [true,'category must be provided'],
        enum: {
            values: ['mobile','computer','furniture','plot'],
            message: '{VALUE} is not a valid category'
        }
    },
    price: {
        type: Number,
        required: [true,'price cannot be empty'],
    },
    images: [
        {
            type: String,
            required: [true,'images must be added']
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    city: {
        type: String,
        required: [true,'city cannot be empty']
    },
    state: {
        type: String,
        required: [true,'state cannot be empty']
    },
    pin: {
        type: String,
        required: [true,'pin cannot be empty'],
        minLength: [6,'pin number must be 6 characters long'],
        maxlength: [6,'pin number must be 6 characters long'],
        trim: true   
    },
    location: {
        coords: {
            lat: {
                type: Number,
                required: true,
            },
            lng: {
                type: Number,
                required: true,
            }
        },
        fullAddress: {
            type: String,
            required: true,
        }
    },
    status: {
        verified: {
            type: Boolean,
            required: true
        },
        approved: {
            type: Boolean,
            required: false
        }
    },
    description: String,
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'report'
        }
    ]
    
},{timestamps: true})

const Product = mongoose.model('product',productSchema);

export default Product;