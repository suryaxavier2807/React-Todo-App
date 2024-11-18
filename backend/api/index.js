const express = require('express')
const app = express()
const todoManupulation = require('./todos')
const cors = require('cors');


const corsOptions = {
    origin: "*" ,
    methods: 'GET,POST', 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};


app.use(cors(corsOptions));



app.use(express.json())

app.use('/api/todos',todoManupulation)

module.exports = app;