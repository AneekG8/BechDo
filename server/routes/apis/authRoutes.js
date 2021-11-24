import express from 'express';
import {email_verification_post, login_get,login_post,logout_post,email_verify_post,email_verification_get, create_user_post, oAuth_post, change_password_post} from '../../controllers/authController.js';
import { isAuth } from '../../middlewares/isAuthenticated.js';
import multer from '../../utils/multer.js';
import cloudinary from '../../utils/cloudinary.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import UserCredential from '../../models/UserCredential.js';
const router = express.Router();

router.get('/login',isAuth,login_get)
router.post('/login',login_post)
router.post('/logout',logout_post)
router.post('/signup/email_verification',email_verification_post)
router.get('/signup/email_verification',email_verification_get)
router.post('/email_verify',email_verify_post)
router.post('/signup/create_user',multer.single('image'),create_user_post)
router.post('/login/oAuth',oAuth_post)
router.post('/change_password/email_verification',email_verification_post)
router.post('/change_password',change_password_post)
router.post('/create_userCred',async (req,res)=>{
    const {email,password} = req.body

    const userCred = await UserCredential.create({email,password})

    res.json(userCred)
})


router.post('/upload',multer.array('images'),async (req,res)=>{
    const files = req.files;
    const images = new Array();
    const imageUrls = new Array();

    const {name,password} = req.body

    for( const file of files)
    {
        const result = await cloudinary.uploader.upload(file.path,(err,r)=>{
            if(err){
                console.log(err)
            }
            if(r){
                images.push(r)
                imageUrls.push(r.secure_url)
            } 
        })
    }
    
    res.json({images: imageUrls,name,password,message:"uploaded"})
})

export default router;