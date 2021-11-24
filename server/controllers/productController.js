import Product from '../models/Product.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js';
import Report from '../models/Report.js'; 
import paginate from 'jw-paginate';
import fetch from 'node-fetch'
import axios from 'axios'
import haversine from 'haversine-distance'

export const products_get = async (req,res)=>{
    try{
        
        const userLocation = JSON.parse(req.query.location)

        const {sortBy,order,category} = req.query;

        let products = []
        
        if(category === 'all')
            products = await Product.find({status: {verified: true,approved: true}})

        else 
            products = await Product.find({category,status: {verified: true,approved: true}})

        products.sort(function(a,b){
            return haversine({...a.location.coords},{...userLocation.coords}) - haversine({...b.location.coords},{...userLocation.coords})
        })

        const page = parseInt(req.query.page);

        // get pager object for specified page
        const pageSize = 6;

        const pager = paginate(products.length, page, pageSize);

        // get page of items from items array
        const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1);

        // console.log(order)

        // pageOfItems.sort((a,b)=>{
        //     if(order === 1)
        //         return a[sortBy] - b[sortBy]
        //     else
        //         return b[sortBy] - a[sortBy]
        // })

        // return pager object and current page of items
        res.status(200).json({ pager, products: pageOfItems });
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}


export const product_get = async (req,res) => {
    try{
        const {id} = req.params;

        let product = await Product.findById(id);

        product = await product.populate('author');

        product = await product.populate('reports');

        res.status(200).json(product)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

export const products_sell_post = async (req,res)=>{
    try{
        const files = req.files;
        
        if(files.length < 3)
            throw new Error('need at least 3 images')

        const {name,category,author,city,state,pin,fullAddress} = req.body;

        const status = {
            verified: false,
            approved: false
        }

        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city},${state}.json?access_token=pk.eyJ1IjoiYW5lZWtnOCIsImEiOiJja3Z3YWVqZGkwOG1lMm9wNHE0YWt3MWR5In0.H5CCB0fESEePGjTaNRoIxQ`)

        const getLocation = response.data

        const location = {
            coords: {
                lat: getLocation.features[0].center[1],
                lng: getLocation.features[0].center[0]
            },
            fullAddress
        }
            
        const images = new Array();

        for( const file of files)
        {
            const result = await cloudinary.uploader.upload(file.path,(err,r)=>{
                if(err){
                    throw(err)
                }
            })
            images.push(result.secure_url)
        }

        const product = await Product.create({...req.body,images,location,status});

        const err = product.validateSync();

        if(err){
            throw(err)
        }

        const user = await User.findById(author);

        user.products.push(product._id);
        await user.save();

        res.status(201).json({user,product})
    }
    catch(err){
        res.status(401).json({message: err.message})
    }
}

export const product_delete = async (req,res)=>{
    try{
        const {id} = req.params

        const product = await Product.findById(id)
        const author = await User.findById(product.author)

        const index = author.products.indexOf(id)
        author.products.splice(index,1)

        await author.save()
        
        const response = await Product.deleteOne({_id: id})
        
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

export const product_report = async (req,res)=>{
    try{
        const id = req.params.id

        const {reason,description,author} = req.body

        const report = new Report({author,product: id,reason,description})

        const err = report.validateSync();

        if(err){
            throw(err)
        }

        const product = await Product.findById(id);

        product.reports.push(report._id);

        await product.save();

        await report.save();

        res.status(201).json(report)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}
