import Message from "../models/Message.js";

export const messages_get = async (req,res)=>{
    try{
            
        const {product_id,user_id} = req.query

        const messages = await Message.find({product_id,user_id}).sort('createdAt');

        res.status(200).json(messages)
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