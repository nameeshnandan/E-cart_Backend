
// 1 To automatically load .env file into our appilcation
require('dotenv').config()  //Loads .env file contents into process.env by default

// 2 import express 
const express = require ('express')

// 6 import cors
const cors = require('cors')

// 8. import db cconnections
require('./DB/connection')

//import router
const router = require('./Routes/router')

// 3 create server application 
const server =  express()

// 5 define port
const PORT = 5000

// 7 use server
server.use(cors())
server.use(express.json())
server.use(router)

// 4 run application
server.listen(PORT,()=>{
    console.log('server listening on the port '+PORT);
})

//route - localhost://5000
server.get('/', (req,res)=>{
    res.status(200).json("E cart sever is started")
})


