import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transport = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'desx.noreply@gmail.com',
        pass: process.env.MAIL_PASS
    }
});

export const sendMail = (to, sub, msg) => {
    transport.sendMail({
        to: to,
        subject: sub,
        html: msg
    });

    console.log('mail sent');
};