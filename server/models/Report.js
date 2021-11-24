import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    reason: {
        type: String,
        required: [true,'you must give a valid reason for reporting']
    },
    description: String
},{timestamps: true})

const Report = mongoose.model('report',reportSchema);

export default Report;