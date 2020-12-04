const express = require('express');
const app = express();
const mongoose = require('mongoose');const bodyParser = require("body-parser");
const PORT = 4000;

const productRoute = require('./routes/productRoute');
app.use(bodyParser.urlencoded({extended:true}));

const db = 'mongodb://localhost/test';

(async function () {
    try {
      await mongoose.connect(db, { useNewUrlParser: true });
      return console.log(`Successfully connected to ${db}`);
    } catch (error) {
      console.log("Error connecting to database: ", error);
      return process.exit(1);
    }
  })();

 
app.use('/people', productRoute.router);


app.listen(PORT, ()=>{
    console.log(`Your server started on port ${PORT}...`);
});