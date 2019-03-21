const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello NodeJs');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.listen(port, () => console.log(`Listening on port ${port}`));