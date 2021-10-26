import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true,'email cannot be empty!'],
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is an invalid email'
        }
    },
    firstName: {
        type: String,
        required: [true,'firstname cannot be empty'],
        minLength: [3,'first name should be at least 3 characters long'],
        maxlength: [10,'first name should be at max 10 characters long'],
        trim: true
    },
    lastName: {
        type: String,
        maxlength: [10,'last name should be at max 10 characters long'],
        trim: true
    },
    phone: {
        type: String,
        required: [true,'contact number cannot be empty'],
        minLength: [10,'conatct number must be 10 characters long'],
        maxlength: [10,'conatct number must be 10 characters long'],
        trim: true   
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
        minLength: [6,'conatct number must be 6 characters long'],
        maxlength: [6,'conatct number must be 6 characters long'],
        trim: true   
    },
    avatar: {
        type: String,
        default: "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
    },
    strategy: {
        type: String,
        required: [true,'cannot create a user without a strategy'],
        enum: {
            values: ['local','oAuth'],
            message: '{VALUE} is not a supported strategy'
        }
    }
})

const User = mongoose.model('user',userSchema);

export default User;