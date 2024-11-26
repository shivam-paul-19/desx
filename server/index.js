import express from 'express';
import mongoose from 'mongoose';
import { sendMail } from './mailing.js';
import { insertUser, updatePassword } from './database.js';
import { User } from './models/users.js';
const app = express();

const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`);
});

// database connection
main()
.then((res) => {
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/desx');
}

// name, email and password
app.post('/create', async (req, res) => {
    let user = await User.find({
        email: req.body.email
    })

    if(user.length > 0) {
        console.log("account already exists");
        res.send(false);
    } else {
        let otp = Math.floor(100000 + Math.random() * 900000);
        let msg = `<h1>The OTP is: ${otp}</h1>`;
        sendMail(req.body.email, 'Welcome to DesX', msg);
        let data = {
            name: req.body.name,
            mail: req.body.email,
            otp: otp,
            is_forget: false,
            pass: req.body.password
        }
    
        res.send(data);
    }

});

app.post('/adduser', (req, res) => {
    let mail = req.body.mail;
    let name = req.body.name;
    let pass = req.body.pass;
    insertUser(mail, name, pass);
});

// forget password mailing route
app.post('/forget', (req, res) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let msg = `<h1>The OTP is: ${otp}</h1>`;
    sendMail(req.body.mail, 'Recover your password', msg);
    let data = {
        name: req.body.name,
        mail: req.body.mail,
        otp: otp,
        is_forget: true
    }

    res.send(data);
});

app.post('/update', async (req, res) => {
    console.log(req.body);
    await updatePassword(req.body.mail, req.body.newPass);
    console.log("password updated");
    res.send("updated");
});

// email and password
app.post('/login', async (req, res) => {
    let user = await User.find({
        email: req.body.email
    })

    if(user.length == 0) {
        res.send("no");
    } else {
        let pass = req.body.password;
        let pass_db = user[0].password;

        if(pass === pass_db) {
            console.log('approved!');
            res.send(["auth", user[0].name]);
        } else {
            res.send("no-auth");
        }
    }

});