import mongoose from 'mongoose';
import bcrypt from  'bcrypt';
import validator from 'validator';

const userCredentialSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true,'email cannot be empty!'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is an invalid email'
        }
    },
    password: {
        type: String,
        required: [true,'password cannot be empty'],
        minLength: [6,'password should be at least 6 characters long']
    }
})

userCredentialSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const UserCredential = mongoose.model('userCredential',userCredentialSchema);

export default UserCredential;