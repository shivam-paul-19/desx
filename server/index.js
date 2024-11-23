import express from 'express';
import { sendMail } from './mailing.js';
const app = express();

const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`);
});

// name, email and password
app.post('/create', (req, res) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let msg = `<h1>The OTP is: ${otp}</h1>`;
    sendMail(req.body.email, 'Welcome to DesX', msg);
    let data = {
        name: req.body.name,
        mail: req.body.email,
        otp: otp,
        is_forget: false
    }

    res.send(data);
});

// forget password mailing route
app.post('/forget', (req, res) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let msg = `<h1>The OTP is: ${otp}</h1>`;
    sendMail(req.body.mail, 'Recover your password', msg);
    let data = {
        name: req.body.name,
        mail: req.body.email,
        otp: otp,
        is_forget: true
    }

    res.send(data);
});

app.post('/login', (req, res) => {
    // email and password
    console.log("login form submitted");
    let email = req.body.email;
    let pass = req.body.password;
    if(email === 'shivampaul2319@gmail.com' && pass === 'password') {
        console.log('approved!');
        res.send(true);
    } else {
        res.send(false);
    }
});