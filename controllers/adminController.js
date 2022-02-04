import Product from '../models/Product.js';
import Report from '../models/Report.js';

export const products_verification_get = async (req,res)=>{
    try{

        const products = await Product.find({status: {verified: false,approved: false}}).sort({'createdAt': 'desc'})

        res.status(200).json(products);
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

export const product_verification_update = async (req,res)=>{
    try{

        const {id} = req.params;

        const status = {
            verified: true,
            approved: true,
        }

        await Product.findOneAndUpdate({_id: id},{status});

        const product = await Product.findById(id)

        res.status(200).json(product);
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

export const reports_get = async (req,res)=>{
    try{

        const reports = await Report.find({}).sort({'createdAt': 'desc'})

        for( let i=0;i<reports.length;i++)
        {
            reports[i] = await reports[i].populate('product')
            reports[i] = await reports[i].populate('author')
        }

        res.status(200).json(reports);
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

export const report_get = async (req,res)=>{
    try{

        const {id} = req.params

        let report = await Report.findById(id)

        report = await report.populate('author')
        report = await report.populate('product')

        res.status(200).json(report);
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}