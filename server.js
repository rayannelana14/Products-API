const express = require('express');
const app = express();

const apiV1Router = require('./routes/apiV1Router');

app.use('/api/v1', apiV1Router);

const port = 3000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
