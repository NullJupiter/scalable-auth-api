// load environment variables from .env file
const _ = require('dotenv/config');

// create express app
const express = require('express');
const app = express();
app.use(express.json());

// connect to mongodb database
const mongoose = require('mongoose');
const mongoURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}/authDB`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to the database!'));

// set header
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'ASP.NET');
    next();
});

// load custom routes and middleware
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

const infoRoute = require('./routes/info');
app.use('/api/info', infoRoute);

// listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});