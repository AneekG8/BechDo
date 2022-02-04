import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    body:{
        type: String,
        required: [true,"cannot send an empty message"]
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    from: {
        type: String,
        required: true,
        enum: {
            values: ['user','seller'],
            message: '{VALUE} is not a valid option'
        }
    }
},{timestamps: true})


const Message = mongoose.model('message',messageSchema);

export default Message;