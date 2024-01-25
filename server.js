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


app.use(cors({
  origin:'https://remote-mentor-production-fd03.up.railway.app/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}))
app.use(express.json())

//app.use(express.urlencoded({ extended: true }))
app.use('/api/codeblocks', codeBlockRoutes)
app.get('/**', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 4000
app.listen(port,"0.0.0.0", () =>{
  console.log(`listening on port ${port}`) 
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
      /*
        //listen for requests
        const port = process.env.PORT || 4000
        server.listen(port,"0.0.0.0", () =>{
        console.log(`connected to db & listening on port ${port}`) 
        })  
        */
       
    })
    .catch((error) => {
        console.log(error)
    })