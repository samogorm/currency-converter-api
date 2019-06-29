import express from 'express';

const app = express();

app.get('/', (request, response) => {
    response.send('Running....')
});

app.listen(5000);