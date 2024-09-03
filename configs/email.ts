const nodemailer = require("nodemailer");
require('dotenv').config();
// const password:string =  || ''
interface MAILSENDER {from:string , to:string, subject:string, text:string, html:string}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECRET === "true" ? true : false || true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function SendMail(opt:MAILSENDER, callBack:any) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: opt.from || process.env.SMTP_USER, // sender address
    to: opt.to, // list of receivers
    subject: opt.subject, // Subject line
    text: opt.text || '', // plain text body
    html: opt.html || '<p></p>', // html body
  }, (error:any, info:any) => {
    transporter.close();

    if (error) {
      callBack(false, error)
        //console.log(error);
    } else {
      callBack(true)
        //console.log('Email sent: ' + info.response+' '+  process.env.SMTP_HOST);
    }
});
  
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

