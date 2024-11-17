const express = require('express')
const app = express()
const port = 8081
const todoManupulation = require('./todos')
const cors = require('cors');

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})

const corsOptions = {
    origin: "*" ,
    methods: 'GET,POST', 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};


app.use(cors(corsOptions));



app.use(express.json())

app.use('/todos',todoManupulation)