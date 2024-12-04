import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { sendMail } from './mailing.js';
import cors from "cors";
import { deleteAll, deleteCanvas, getCanvas, insertCanvas, insertUser, loadCanvas, updateCanvas, updateName, updatePassword } from './database.js';
import { User } from './models/users.js';
const app = express();

const port = 8080;

dotenv.config();

app.use(cors({
    origin: "*"
}));

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
  await mongoose.connect(process.env.MONGO_URL);
}

// name, email and password
app.post('/create', async (req, res) => {
    let user = await User.find({
        email: req.body.email
    })

    if(user.length > 0) {
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

app.post('/addcanvas', async (req, res) => {
    let name = req.body.name;
    let user = req.signedCookies.uid[0].email;
    let canState = await loadCanvas(user, name);
    if(canState == null) {
        let date = new Date(Date.now());
        const canvasData = {
            name: req.body.name,
            user: req.signedCookies.uid[0].email,
            last_updated: date,
            canvas_state: { version: '6.4.3', objects: [], background: '#ffffff' }
        }
        await insertCanvas(canvasData);
        res.send(true);
    } else {
        res.send(false);
    }
});

app.post('/updatecanvas', async (req, res) => {
    const canvasData = {
        user: req.signedCookies.uid[0].email,
        name: req.body.name.name,
        last_updated: req.body.time,
        canvas_state: req.body.state
    }
    await updateCanvas(canvasData.user, canvasData.name, canvasData.canvas_state, canvasData.last_updated);
    res.send(true);
});

app.get('/getcanvas', async (req, res) => {
    let canNames = [];
    let canvases = await getCanvas(req.signedCookies.uid[0].email);
    canvases.forEach((c) => canNames.push([c.name, c.last_updated]));
    canNames.sort((a, b) => new Date(b[1]) - new Date(a[1]));
    res.send(canNames);
});

app.get('/getuser', (req, res) => {
    res.send(req.signedCookies.uid[0]);
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

app.post('/updatepassword', async (req, res) => {
    await updatePassword(req.body.mail, req.body.newPass);
    if(req.body.isLog) {
        let user = [{
            email: req.body.mail,
            name: req.signedCookies.uid[0].name,
            password: req.body.newPass
        }];
        res.clearCookie("uid");
        res.cookie("uid", user, {
            expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
            signed: true
        });
        res.send("updated");
    } else {
        res.send("updated");
    }
});

app.post('/updatename', async (req, res) => {;
    await updateName(req.body.mail, req.body.newName);
    let user = [{
        email: req.signedCookies.uid[0].email,
        name: req.body.newName,
        password: req.signedCookies.uid[0].password
    }];
    res.clearCookie("uid");
    res.cookie("uid", user, {
        expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
        signed: true
    });
    res.send("updated");
});

app.get('/isuser', async (req, res) => {
    if(req.signedCookies.uid) {
        res.send(req.signedCookies.uid);
    } else {
        res.send(false);
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie("uid");
    res.send("cookies deleted");
});

app.get('/deleteuser', async (req, res) => {
    let user = req.signedCookies.uid[0].email;
    res.clearCookie("uid");
    await deleteAll(user);
    console.log(`${user} account deleted`);
    res.send("deleted");
});

// email and password
app.post('/login', async (req, res) => {
    let user = await User.find({
        email: req.body.email
    });

    if(user.length == 0) {
        res.send("no");
    } else {
        let pass = req.body.password;
        let pass_db = user[0].password;

        if(pass === pass_db) {
            res.cookie("uid", user, {
                expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
                signed: true
            });
            res.send("auth");
        } else {
            res.send("no-auth");
        }
    }

});