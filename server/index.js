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
    console.log("login form submitted");
    console.log(req.body);
});