import Product from '../models/Product.js'

export const user_products_get = async (req,res) => {
    try{
        
        const {id} = req.params;

        const products = await Product.find({author: id})

        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}