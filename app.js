const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config()
const router = require('./routers/router')

const app = express();
app.use(cors({origin: true}))

app.use(express.json())

app.use('/api',router)

const server = http.createServer(app)

mongoose.connect(process.env.DB_LOCAL_URI).then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server runing on port ${process.env.PORT}`)
    })
}).catch(err=>{
    console.log('could not connect to database')
})
