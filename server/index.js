import express from 'express';
const app = express();

const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`);
});

app.post('/create', (req, res) => {
    console.log(req.body);
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