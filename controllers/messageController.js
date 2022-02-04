import Message from "../models/Message.js";
import User from "../models/User.js";
import lodash from 'lodash'
export const messages_product_user_get = async (req,res)=>{
    try{
            
        const {product_id,user_id} = req.params

        const messages = await Message.find({product_id,user_id}).sort('createdAt');

        const user = await User.findById(user_id);

        res.status(200).json({messages,user})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const messages_product_get = async (req,res)=>{
    try{
            
        const {product_id} = req.params

        const messages = await Message.find({product_id})

        const users = Object.keys(lodash.groupBy(messages,'user_id'))

        for(let i=0;i<users.length;i++)
            users[i] = await User.findById(users[i])

        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const messages_post = async (req,res)=>{
    try{
        const message = new Message(req.body);

        const err = message.validateSync()

        if(err){
            throw(err)
        }

        await message.save()

        res.status(201).json(message)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}