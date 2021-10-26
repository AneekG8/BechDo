import UserCredential from "../models/UserCredential.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import send_verification_mail from '../utils/sendMail.js'
import authenticateUser from "../utils/authenticateUser.js";
import User from "../models/User.js";

export const login_get = async (req,res)=>{

    const user = await User.findOne({_id: req.userId});
    res.status(200).json({isAuth: true,user})
}

export const login_post = async (req,res)=>{

    const {email,password} = req.body;

    try{
            
        const userCredential = await UserCredential.findOne({email});

        if(!userCredential)
            throw(new Error('this email id is not registered!'));

        const match = bcrypt.compareSync(password,userCredential.password);
        //const match = password === userCredential.password

        if(!match)
            throw(new Error('password doesn\'t match'));

        const user = await User.findOne({email,strategy: 'local'});

        authenticateUser(res,user._id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

export const email_verification_post = async (req,res)=>{

    try{

        const email = req.body.email;
        const userExists = await UserCredential.findOne({email});

        if(userExists)
            throw(new Error('this email id is already registered'));

        await send_verification_mail(email,req);

        res.status(200).json({success: true,message: 'email has been sent for verification'})
    }
    catch(err){
        res.status(400).json({success: false,message: err.message})
    }
}

export const email_verification_get = (req,res)=>{
    const token = req.cookies.auth_project_email_verified;
    let verified = false;
    try{
        const decodedToken = jwt.verify(token,process.env.SESSION_SECRET)
        verified = true;
    }
    catch(err){
        verified = false;
    }
    // res.clearCookie('auth_project_email_verified',{
    //     maxAge: 5*1000,
    //     secure: true,
    //     httpOnly: true,
    //     domain: 'localhost',
    //     path: '/' 
    // })
    res.status(200).json({verified})
}

export const email_verify_post = (req,res)=>{
    const token = req.body.token;

    try{
        if(token)
        {
            const { email } = jwt.verify(token,process.env.SESSION_SECRET);
            
            const newToken = jwt.sign(
                { email },
                process.env.SESSION_SECRET,
                {
                    expiresIn: '5s'
                }
            )

            res.cookie('auth_project_email_verified',newToken,{
                maxAge: 5*1000,
                secure: true,
                httpOnly: true,
                domain: 'localhost',
                path: '/' 
            });

            res.status(200).json({verified: true,message: "email has been verified successfully!"});
        }
        else
            throw(new Error("empty token")); 
    }
    catch(err)
    {
        res.status(400).json({verified: false,message: err.message});
    }
}

export const create_user_post = async (req,res)=>{
    try{
        let {email,password,firstName,lastName,phone,city,state,pin,avatar,strategy} = req.body;

        const newUserCredential = strategy === 'local' ? new UserCredential({email,password}) : undefined;

        avatar = avatar || "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png";

        const newUser = new User({email,firstName,lastName,phone,city,state,pin,strategy,avatar});

        let err = newUser.validateSync();

        if(err){
            throw(err);
        }

        err = newUserCredential?.validateSync();

        if(err){
            throw(err);
        }

        const userExists = await User.findOne({email,strategy});

        if(userExists)
            throw(new Error('user already exists'))

        const user = await newUser.save();

        const userCredential = await newUserCredential?.save();

        authenticateUser(res,user._id);
        
        res.status(201).json({user,userCredential,message: 'you have been signed up successfully!'});
    }
    catch (err){
        console.log(err.message)
        res.status(400).json({message: err.message})
    }
}

export const oAuth_post = async (req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email,strategy: 'oAuth'})

        if(!user)
            throw(new Error('regstration required for first time'));

        authenticateUser(res,user._id);

        res.status(200).json({user,message: 'user logged in!'})
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}

export const logout_post = (req,res)=>{
    res.cookie('auth_project_token','',{maxAge: 0});
    res.status(200).json({message: 'user logged out!'})
}