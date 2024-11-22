import express from 'express';
import { sendMail } from './mailing.js';
const app = express();

const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`);
});

// email and password
app.post('/create', (req, res) => {
    let otp = Math.round(Math.random()*1000000);
    let msg = `<h1>The OTP is: ${otp}</h1>`;
    sendMail(req.body.email, 'Welcome to DesX', msg);
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