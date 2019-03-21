const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello NodeJs');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));