import jwt from 'jsonwebtoken';
import mailer from 'nodemailer';

const send_verification_mail = async(email,req) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        // secure: false,
        // port: 25,
        auth: {
            user: "aneekghosh52@gmail.com",
            pass: "i am 18+"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const token = jwt.sign(
        { email },
        process.env.SESSION_SECRET,
        {
        expiresIn: '60s'
        }
    )
    
    //const base = req.protocol + '://' + req.get('host');
    const base = 'http://localhost:3000'

    
    const mailOptions = {
        from: 'noreply @learn_authentication.com', // sender address
        to: email, // list of receivers
        subject: "Verification Required", // Subject line
        html: `<a href = "${base}/email_verification?token=${token}">verify your mail</a>`// html body
    }

    //console.log(mailOptions.html);

    try
    {
        //console.log(req.get('host'));
        await transporter.sendMail(mailOptions);
        //console.log('mail sent');
    }
    catch(e)
    {
        throw(e);
    }

}

export default send_verification_mail;