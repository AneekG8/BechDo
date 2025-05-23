import jwt from "jsonwebtoken";
import mailer from "nodemailer";

const send_verification_mail = async (email, req) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    secure: false,
    // port: 25,
    auth: {
      user: "aneekghosh52@gmail.com",
      pass: "xuoe spzl clic pipp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const token = jwt.sign({ email }, process.env.SESSION_SECRET, {
    expiresIn: "60s",
  });

  //const base = req.protocol + '://' + req.get('host');
  const base = "http://localhost:3000";

  let subject = "No Subject";

  if (req.path === "/change_password/email_verification")
    subject = "Verification Required to Change Password @BechDo";
  else if (req.path === "/signup/email_verification")
    subject = "Verification Required for Sign-up @BechDo";

  const mailOptions = {
    from: "noreply @learn_authentication.com", // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: `<a href = "${base}/email_verification?token=${token}">verify your mail</a>`, // html body
  };

  //console.log(mailOptions.html);

  try {
    //console.log(req.get('host'));
    await transporter.sendMail(mailOptions);
    //console.log('mail sent');
  } catch (e) {
    throw e;
  }
};

export default send_verification_mail;
