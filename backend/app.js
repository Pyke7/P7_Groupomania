const express = require('express');
const app = express();
const port = 3000;

const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;