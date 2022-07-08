const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const createError  = require('http-errors');
const  { StatusCodes }  = require('http-status-codes');
const cors = require('cors');

const port =  process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// DB connection
require('./config/database');

// Import routes
const userRoutes = require('./src/routes/v1/users');
const Exception = require('./src/exceptions/HttpExceptionHandler');

// Router Middleware
app.use('/v1', userRoutes);

app.use(function(req, res, next){
    next(createError(StatusCodes.NOT_FOUND));
});

//Exception Handling Errors
app.use(Exception.handler);

app.listen(port, () => {
    console.log(`App listing on port ${port}`)
});