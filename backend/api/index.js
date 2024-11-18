console.log("api triggered successfully");

const express = require('express');
const app = express();
const todoManupulation = require('./todos'); // Import your routes
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: "*", 
  methods: 'GET,POST', 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));
app.use(express.json());

// Use the routes for todos
app.use('/todos', todoManupulation);

module.exports = app
