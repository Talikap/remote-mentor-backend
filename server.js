require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { createServer } = require('node:http')
const path = require('path')
const cors = require('cors');
const codeBlockRoutes = require('./routes/codeblocks')
const socketHandler = require('./socketHandler')



//express app
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:3000', 'http://localhost:3000'], 
      credentials: true
  }
  app.use(cors(corsOptions))
}


//app.use(express.urlencoded({ extended: true }))
app.use('/api/codeblocks', codeBlockRoutes)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


//const corsOptions = {
  //  origin: 'https://remote-mentor-production.up.railway.app', // Replace with your React app's URL
   // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //};
  

  //app.use((req, res, next) => {
   //console.log(req.path, req.method)
    //next();
  //});

//app.use(cors(corsOptions));
//app.get('/',(req, res) => {
  //  res.json({mssg: 'Welcome to the app'})
//})


//middleware


// routes



//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //create HTTP server
        const server = createServer(app)

        //integrate socket handelling
        socketHandler(server)
      
        //listen for requests
        const port = process.env.PORT || 4000
        server.listen(port,"0.0.0.0", () =>{
        console.log(`connected to db & listening on port ${port}`) 
        })  
        
       
    })
    .catch((error) => {
        console.log(error)
    })
/*
  const port = process.env.PORT || 4000
  app.listen(port,"0.0.0.0", () =>{
    console.log(`listening on port ${port}`) 
})*/