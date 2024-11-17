import express from 'express';
const app = express();

const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Server listening to port ${port}`);
});

app.get('/test', (req, res) => {
    console.log('get request!');
});

app.post('/test_post', (req, res) => {
    console.log('recieving a post req');
    console.log(req.body);
});