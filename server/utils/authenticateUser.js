import jwt from 'jsonwebtoken';

const authenticateUser = (res,id)=>{
    const token = jwt.sign(
        { id },
        process.env.SESSION_SECRET,
        {
            expiresIn: "1h"
    });

    res.cookie('auth_project_token',token,{
        maxAge: 3600*1000,
        secure: true,
        httpOnly: true
        //port: 5000
        //domain: 'localhost:5000'
    });
}

export default authenticateUser