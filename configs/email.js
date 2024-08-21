"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = SendMail;
const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp,gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Boolean(process.env.SMTP_SECRET) || true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
// async..await is not allowed in global scope, must use a wrapper
function SendMail(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: opt.from || process.env.SMTP_USER, // sender address
            to: opt.to, // list of receivers
            subject: opt.subject, // Subject line
            text: opt.text || '', // plain text body
            html: opt.html || '<p></p>', // html body
        }, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response + ' ' + process.env.SMTP_HOST);
            }
            transporter.close();
        });
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    });
}
