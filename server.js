require('dotenv').config()

const express = require('express');
const PORT = 4000;

const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const Router = require('./routes');  // all routes are imported here by index.js file:
const Middleware = require('./helpers/middlewares')
global.__basedir = __dirname;

app.use(cors())
app.use(express.json())

//Token verification middleware:
app.use(Middleware.authenticationMiddleware);

//Router
app.use(Router);

//ErrorHandling Middleware
app.use(Middleware.errorHandlersMiddleware);


// Database and Server connection:
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
  console.log("database is connected!")
  app.listen(PORT, () => {
    console.log("Server is Running on Port 4000")
  });
})
.catch((err) => {
  console.log('Error during Databse connection!',err)
})


