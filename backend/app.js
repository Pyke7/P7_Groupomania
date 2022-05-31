const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 3000;

const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());


app.use('/api/auth', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;