import jwt from 'jsonwebtoken';

export const isAuth = (req,res,next)=>{
    const token = req.cookies.auth_project_token;

    if(token){

        try{
            const decodedToken = jwt.verify(token,process.env.SESSION_SECRET);
            
            req.userId = decodedToken.id;

            next();
        }
        catch(err){
            res.status(400).json({isAuth: false,message: 'Access Denied!'});
        }
    }
    else{
        res.status(400).json({isAuth: false,message: 'Session Expired!'});
    }
}