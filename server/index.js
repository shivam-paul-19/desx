import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { sendMail } from './mailing.js';
import { deleteCanvas, getCanvas, insertCanvas, insertUser, loadCanvas, updateCanvas, updatePassword } from './database.js';
import { User } from './models/users.js';
const app = express();

const port = 8080;

dotenv.config();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_CODE));
app.use(session({
    secret: "secrerstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    }
}));

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
        req.session.otp = otp;
        let msg = `<h1>The OTP is: ${otp}</h1>`;
        sendMail(req.body.email, 'Welcome to DesX', msg);
        let data = {
            name: req.body.name,
            mail: req.body.email,
            otp: req.session.otp,
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

app.post('/addcanvas', (req, res) => {
    let date = new Date(Date.now());
    const canvasData = {
        user: req.signedCookies.uid[0].email,
        name: req.body.name,
        last_updated: date,
        canvas_state: { version: '6.4.3', objects: [], background: '#ffffff' }
    }
    let result = insertCanvas(canvasData);
    res.send(result)
});

app.post('/updatecanvas', async (req, res) => {
    const canvasData = {
        user: req.signedCookies.uid[0].email,
        name: req.body.name.name,
        last_updated: req.body.time,
        canvas_state: req.body.state
    }
    await updateCanvas(canvasData.user, canvasData.name, canvasData.canvas_state, canvasData.last_updated);
});

app.get('/getcanvas', async (req, res) => {
    let canNames = [];
    let canvases = await getCanvas(req.signedCookies.uid[0].email);
    canvases.forEach((c) => canNames.push([c.name, c.last_updated]));
    canNames.sort((a, b) => new Date(b[1]) - new Date(a[1]));
    console.log(canNames);
    res.send(canNames);
});

app.get('/getuser', (req, res) => {
    res.send(req.signedCookies.uid[0].name);
});

app.post('/deletecanvas', async (req, res) => {
    let name = req.body.name;
    let user = req.signedCookies.uid[0].email;
    await deleteCanvas(user, name);
});

app.post('/loadcanvas', async (req, res) => {
    let name = req.body.name;
    let user = req.signedCookies.uid[0].email;
    let canState = await loadCanvas(user, name);
    console.log(canState.canvas_state);
    res.send(canState.canvas_state);
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

app.get('/isuser', async (req, res) => {
    if(req.signedCookies.uid) {
        res.send(req.signedCookies.uid);
    } else {
        res.send(false);
    }
})

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
            res.cookie("uid", user, {
                expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
                signed: true
            });
            res.send(["auth", user[0].name]);
        } else {
            res.send("no-auth");
        }
    }

});